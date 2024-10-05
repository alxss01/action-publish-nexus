import * as core from '@actions/core'
import axios from 'axios';
import * as fs from 'fs';
import { mocked } from 'jest-mock';
import { run } from '../src/index';

// Mocando dependências

jest.mock('@actions/core');
jest.mock('axios');
jest.mock('fs');

// Converte para a versão de mock das funções
const mockedCore = mocked(core);
const mockedAxios = mocked(axios);
const mockedFs = mocked(fs);

describe('Nexus Publish Action', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve enviar o artefato para o Nexus', async () => {
        // Mocando funções getInput()
        mockedCore.getInput.mockImplementation((name: string) => {
            switch (name) {
                case 'nexus_url':
                  return 'http://localhost:8081';
                case 'username':
                  return 'admin';
                case 'password':
                  return 'admin123';
                case 'file_path':
                  return 'target/artifact.jar';
                case 'artifact_id':
                  return 'ms-save-car';
                case 'group_id':
                  return 'br.com.devsenior';
                case 'version':
                  return '1.0.1';
                case 'repository_id':
                  return 'devops-maven-snapshot';
                default:
                  return '';
              }
        });

        mockedFs.readFileSync.mockReturnValue('ms-save-car.jar');

        mockedAxios.put.mockResolvedValue({
            status: 200,
            data: 'success'
        });

        await run();

        expect(mockedAxios.put).toHaveBeenCalledWith(
            'http://localhost:8081/repository/devops-maven-snapshot/br/com/devsenior/ms-save-car/1.0.1',
            '/ms-save-car.jar',
            {
              headers: {
                    'Content-Type': 'application/octet-stream'
              },
              auth: {
                username: 'admin',
                password: 'admin123'
              }
            }
        );

        // Verificar se a função core.info foi chamada
        expect(mockedCore.info).toHaveBeenCalledWith('Upload successful: 200');
    });
})


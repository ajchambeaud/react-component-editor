export default {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
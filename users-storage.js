import { loadUsers, saveUsers } from './users-storage.js';

// �������� �������������
let users = loadUsers();

// �������� ������ ������������
users.push({ nick: "Test", pass: "123", role: "�����" });

// ��������� ���������
saveUsers(users);
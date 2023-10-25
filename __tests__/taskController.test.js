const mongoose = require('mongoose');
const Task = require('../models/task');  // Importa el modelo
const {
  getTasks,
  createTask,
  getTaskById
} = require('../controllers/task');  // Importa los controladores

// Conecta a la base de datos antes de ejecutar las pruebas
beforeAll(async () => {
  await mongoose.connect('mongodb+srv://dsolorzanom:Devin01@cluster0.ifgcnkc.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Desconecta de la base de datos después de ejecutar las pruebas
afterAll(async () => {
  await mongoose.disconnect();
});

describe('Task Controller Tests', () => {
  // Define una tarea de prueba para usar en las pruebas
  let testTask;

  beforeAll(async () => {
    // Crea una tarea de prueba
    testTask = new Task({
      title: 'Test Task',
      details: 'This is a test task',
      dueDate: new Date(),
      priority: 'alta',
      labels: ['Test'],
      userId: 123,
    });
    await testTask.save();
  });

  afterAll(async () => {
    // Elimina la tarea de prueba después de las pruebas
    await Task.findByIdAndRemove(testTask._id);
  });

  it('getTasks should return a list of tasks', async () => {
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getTasks(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ title: 'Test Task' })]));
  });

  it('createTask should create a new task', async () => {
    const req = {
      body: {
        title: 'New Task',
        details: 'This is a new task',
        dueDate: new Date(),
        priority: 'alta',
        labels: ['New'],
        userId: 456,
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await createTask(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ task: expect.objectContaining({ title: 'New Task' }) }));
  });

  it('getTaskById should return a specific task', async () => {
    const req = {
      params: { id: testTask._id.toString() },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getTaskById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ title: 'Test Task' }));
  });
});

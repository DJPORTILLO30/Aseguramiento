const mongoose = require('mongoose');
const Task = require('../models/task');
const User = require('../models/user'); // Import the User model

const {
  getTasks,
  createTask,
  getTaskById
} = require('../controllers/task');

beforeAll(async () => {
  await mongoose.connect('mongodb+srv://dsolorzanom:Devin01@cluster0.ifgcnkc.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Task Controller Tests', () => {
  let testTask;
  let testUser;

  beforeAll(async () => {
    // Create a test user
    testUser = new User({
      username: 'testuser',
      password: 'testpassword',
      // Add any other required user fields
    });
    await testUser.save();

    // Create a test task
    testTask = new Task({
      title: 'Test Task',
      details: 'This is a test task',
      dueDate: new Date(),
      priority: 'alta',
      labels: ['Test'],
      userId: testUser._id, // Use the _id of the test user
    });
    await testTask.save();
  });

  afterAll(async () => {
    await Task.findByIdAndRemove(testTask._id);
    await User.findByIdAndRemove(testUser._id); // Remove the test user as well
  });

  it('getTasks should return a list of tasks', async () => {
    const req = { userId: testUser._id }; // Set the userId to the test user's _id
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
      },
      userId: testUser._id, // Use the test user's _id
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

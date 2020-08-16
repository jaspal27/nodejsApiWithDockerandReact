const db = require('./database');

beforeAll(async () => {
    await db.sequelize.sync();
});

test('create person', async () => {
    expect.assertions(1);
    const person = await db.Person.create({
        id: 1,
        firstName: 'Jaspal',
        lastName: 'Singh'
    });
    expect(person.id).toEqual(1);
});

test('get person', async () => {
    expect.assertions(2);
    const person = await db.Person.findByPk(1);
    expect(person.firstName).toEqual('Jaspal');
    expect(person.lastName).toEqual('Singh');
});

test('delete person', async () => {
    expect.assertions(1);
    await db.Person.destroy({
        where: {
            id: 1
        }
    });
    const person = await db.Person.findByPk(1);
    expect(person).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});
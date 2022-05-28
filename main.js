const express = require('express');
const mongoose = require('mongoose');

const {Dog} = require('./models');

const app = express();

app.use(express.json());

//Get all dogs in the db
app.get('/dogs', async (req, res) =>
{
    const allDogs = await Dog.find();
    return res.status(200).json(allDogs);
})


//Get a single dog by id from the db
app.get("/dogs/:id", async (req, res) =>
{
    const { id } = req.params;
    const dog = await Dog.findById(id);
    return res.status(200).json(dog);
})

//add a new dog to the db
app.post('/dogs', async (req, res) =>
{
    const newDog = new Dog({ ...req.body })
    const insertedDog = await newDog.save();
    return res.status(201).json(insertedDog);
})

//update a dog details in the db
app.put('/dogs/:id', async (req, res) =>
{
    const { id } = req.params;
    await Dog.updateOne({ id }, req.body);
    const updatedDog = await Dog.findById(id);
    return res.status(200).json(updatedDog);
})

//delete a dog from the db
app.delete('/dogs/:id', async (req, res) =>
{
    const { id } = req.params;
    const deletedDog = await Dog.findByIdAndDelete(id);
    return res.status(200).json(deletedDog, "Dog deleted");
})

app.get("/", async (req, res) =>
{ 
    return res.json({message: "Hello World 🥱"});
});

const port = process.env.PORT || 3000;
const start = async () =>
{
    try
    {
        await mongoose.connect('mongodb://localhost:27017/mongoose?authSource=admin');
        app.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

start();
const mongoose = require('mongoose');
const Category = require('../models/Category');

exports.getCategories = async (req, res) => {

    try {
        const categories = await Category.find({enabled: true});
        console.log(categories);
        res.json({categories});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.createCategory = async (req, res) => {

    try {
                
        const category = new Category(req.body);
        await category.save();
        res.json({category});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.updateCategory = async (req, res) => {
    
    const { name, enabled } = req.body;
    try {
        let category;
        category = await Category.findById(req.params.id);

        if(!category) {
            return res.status(400).json({msg: 'Categoría no encontrada'});
        }

        const newCategory = {};
        newCategory.name = name;
        newCategory.enabled = enabled;

        category = await Category.findOneAndUpdate({_id: req.params.id}, newCategory, {new: true});
        res.json({category});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
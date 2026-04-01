import {model, models, Schema} from "mongoose";

const categoriesSchema = new Schema({
    name: {type: String, require: true},
    nickName: {type: String, require: true}
})

const Categories = models.Categories || model('Categories', categoriesSchema);

export default Categories;
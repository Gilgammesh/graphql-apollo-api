/*****************************************************************************************/
// Añadimos los Imports //
/*****************************************************************************************/
import { Schema, model } from "mongoose";

/*****************************************************************************************/
// Definimos el schema de User //
/*****************************************************************************************/
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    img: {
        type: String
    }
}, {
    timestamps: true
})

/*****************************************************************************************/
// Exportamos el model User, usando el schema creado //
/*****************************************************************************************/
export default model('User', userSchema);
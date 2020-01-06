```javascript
const userSchema = new Schema({
        username: {type: String, required: true},
        password: String,
        documents: [String]
});
```
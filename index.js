const mongoose = require('mongoose')
const prog = require('caporal')
const Confirm = require('prompt-confirm')

mongoose.connect('mongodb://localhost:27017/cli-mongoose')
    .then(() => console.log('Connected to mongoDB'))
    .catch(err => console.log('Could not connect to mongoDB', err))

const listSchema = new mongoose.Schema({
    name: String
})

const List = mongoose.model('todoList', listSchema)
    prog.version('1.0.0')
    .command('todo list', 'Show all todo list')
    .action((args, option, logger) => {
        async function findAllRows() {
            const data = await List.find({})
            console.log(data)
        }
    findAllRows();
    })
    .command('todo add', 'Add new todo item')
    .argument('<item>', 'Item to add')
    .action((args, option, logger) => {
        async function createList() {
            const listTodo = new List({
                name: args.item
            })
            
            const result = await listTodo.save()
            console.log(result)
        } 
        createList()
    })  
    .command('todo update', 'Add new todo item')
    .argument('<_id>', 'Parameter ID')
    .argument('<value>', 'Value')
    .action((args, option, logger) => {
        async function updateRow() {
            const result = await List.update({ _id: args._id }, {
                name: args.value
              });
              console.log(result)
        }
        
        updateRow();
    })
    .command('todo del', 'Delete todo item')
    .argument('<id>', 'Parameter ID')
    .action((args, option, logger) => {
        async function deleteRow() {
            List.deleteOne({ _id: args.id }, function (err) {
                if (err) return handleError(err);
                  logger.info(`Deleted dccument`)
              });
        }
        deleteRow();
    })
    .command('todo clear', 'Delete all item')
    .action((args, option, logger) => {
        async function clearDocs() {
            
            List.remove()
        }
        const prompt = new Confirm('Are you sure want to delete?');
        prompt.ask(function(answer) {
            if (answer == true) {
                clearDocs()
                ogger.info(`Deleted All Document`)
            }
          });
    })

    prog.parse(process.argv);




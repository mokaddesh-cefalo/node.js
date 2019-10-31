const EventEmitter = require('events');

class Server extends EventEmitter {
    constructor(client){
        super();
        this.tasks = {};
        this.taskId = 1;

        process.nextTick( () => {
            this.emit('response', 'Type a command(help to list command)');
        });
        client.on('command', (command, args) => {

            console.log(command);
            switch (command) {
                case 'help':
                case 'add':
                case 'ls':
                case 'delete':
                    this[command](args);
                    break;
                default:
                this.emit('response', "Unknown command!");
            }
        });
        ///help, ls, add, delete
    }

    help(){
        this.emit('response', `Available Commands:
        add task
        ls
        delete taskId`);
    }

    tasksString(){
        return Object.keys(this.tasks).map(key => {
            return `${key}: ${this.tasks[key]}`;
        }).join('\n');
    }
    ls(args){
        this.emit('response', `Tasks:\n${this.tasksString()}`);
    }
    add(args){
        this.tasks[this.taskId] = args.join(' ');
        this.emit('response', `Added task ${this.taskId}`);
        this.taskId++;
    }
    delete(args){
        delete(this.tasks[args[0]]);
        this.emit('response', `Delete task ${args[0]}`);
    }
}

module.exports = (client) => new Server(client);

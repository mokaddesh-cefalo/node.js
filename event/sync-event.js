const EventEmitter = require('events');
const fs = require('fs');

class WithLog extends EventEmitter {

    execute(asyncFunc, ...args) {
        console.time('execute');
        this.emit('begin');
        
        asyncFunc(...args, (err, data) => {
            if(err) return this.emit('error', err);
            
            this.emit('data', data);
            this.emit('end');
            console.timeEnd('execute');
        });
    }
}

const withLog = new WithLog();

withLog.on('begin', () => console.log('About to execute'));
withLog.on('end', () => console.log('Done with execute'));
//withLog.on('data', (data) => `Length: ${data.length}`);

withLog.execute(fs.readFile, __filename);

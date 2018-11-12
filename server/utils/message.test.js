var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage',()=>{

    it('should correct message',()=>{
        var from = 'hysham';
        var text = 'some message';
        var res = generateMessage(from,text);
        expect(res).toInclude({
            from,
            text
        });
        expect(res.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage',()=>{
    it('should be correct location', ()=>{
        var from = 'hysham';
        var lat = 12;
        var lng = 41;
        var url = 'https://www.google.com/maps?q=12,41'
        var res = generateLocationMessage(from,lat,lng);
        expect(res).toInclude({from,url});
        expect(res.createdAt).toBeA('number');
    });
});
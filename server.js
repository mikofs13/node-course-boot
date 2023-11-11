const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const app = express();


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');






app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + "\n", (err) => {
        if(err) console.log(err)
    })
    next()
})

/* app.use((req,res, next) => {
    res.render('maintenance.hbs');

});  */
app.use(express.static(__dirname + '/public'));




hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})








app.get('/', (req, res) => {
    //res.send(`<h1> ${req.url} this is my territory </h1>`)
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeText: 'Welcome to our website'

    })

});

app.get('/about', (req,res)=>{{
    res.render('about.hbs', {
        pageTitle: 'About Page',
        welcomeText: 'Welcome to our website'
    })
}})

app.get('/bad', (req,res) =>{
    res.send({
        errorMessage: 'Unable to handle request'
    })
})



app.listen(3500, () => {
    console.log('listening at port 3500');
})



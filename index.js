/**
 * Sudoku Game
 */

// Set up dependencies
const express = require('express');
const app = express();
const handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
});
const bodyParser = require('body-parser');

// Prepare express settings
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', 9096);

// Root
app.get('/', function(req, res, next){
    let context = {
        pageTitle: "Sudoku",
        puzzle: [
            ["", "", "", 2, 6, "", 7, "", 1],
            [6, 8, "", "", 7, "", "", 9, ""],
            [1, 9, "", "", "", 4, 5, "", ""],
            [8, 2, "", 1, "", "", "", 4, ""],
            ["", "", 4, 6, "", 2, 9, "", ""],
            ["", 5, "", "", "", 3, "", 2, 8],
            ["", "", 9, 3, "", "", "", 7, 4],
            ["", 4, "", "", 5, "", "", 3, 6],
            [7, "", 3, "", 1, 8, "", "", ""]
        ]
    };
    res.render('index', context);
});

// Check Puzzle Answer
app.post('/check', function(req, res){
    let sudoku = req.body.sudoku;

    // Validate input
    const regex = /^\d$/;
    for (let i = 0; i < sudoku.length; i++) {
        for (let j = 0; j < sudoku.length; j++) {
            if (!sudoku[i][j].match(regex)) {
                return res.send(false);
            }
        }
    }

    // Generate status arrays
    let rows = [];
    let cols = [];
    let boxes = [];

    for (let i = 0; i < sudoku.length; i++) {
        rows.push([]);
        cols.push([]);
        boxes.push([]);

        for (let j = 0; j < sudoku.length; j++) {
            rows[i].push(false);
            cols[i].push(false);
            boxes[i].push(false);
        }
    }

    // Check values
    let answer = 0;
    let box = 0;
    for (let i = 0; i < sudoku.length; i++) {
        for (let j = 0; j < sudoku.length; j++) {
            answer = sudoku[i][j] - 1;

            // Check rows
            if (rows[i][answer]) {
                return res.send(false);
            } else {
                rows[i][answer] = true;
            }

            // Check columns
            if (cols[j][answer]) {
                return res.send(false);
            } else {
                cols[j][answer] = true;
            }

            // Check boxes
            box = Math.floor(j/(sudoku.length/Math.sqrt(sudoku.length)));
            box += Math.floor(i/(sudoku.length/Math.sqrt(sudoku.length))) * (sudoku.length/Math.sqrt(sudoku.length));
            if (boxes[box][answer]) {
                return res.send(false);
            } else {
                boxes[box][answer] = true;
            }
        }
    }

    // If made it through, then the sudoku is right
    res.send("true");
});

// 404 Page Not Found Error
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

// 500 Server Error
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

// Start app
app.listen(app.get('port'), function(){
    console.log('Express started; press Ctrl-C to terminate.');
});
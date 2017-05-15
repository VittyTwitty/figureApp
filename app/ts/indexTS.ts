import $ = require('jquery') ;


class Figure {
    point_x: number;
    point_y: number;
    width_figures: number;

    constructor(figure_point_x: number,figure_point_y : number, width_figure: number){
        this.point_x =figure_point_x;
        this.point_y = figure_point_y;
        this.width_figures = width_figure;
    }
}

class Triangle extends Figure {

    constructor(figure_point_x: number,figure_point_y : number, width_figure: number){
       super(figure_point_x,figure_point_y, width_figure);
    }

    public getPerimeter() {
        return (3* this.width_figures).toFixed(2);
    }
    public getSquare() {
        return (Math.sqrt(3)/4*this.width_figures*this.width_figures).toFixed(2);
    }

}

class Rectangle extends Figure {

    height_figures: number;

    constructor(figure_point_x: number,figure_point_y : number, width_figure: number, height_figure: number){
        super(figure_point_x,figure_point_y, width_figure);
        this.height_figures = height_figure;
    }

    public getPerimeter() {
        return (2*(this.width_figures + this.height_figures)).toFixed(2);
    }
    public getSquare() {
        return (this.width_figures * this.height_figures).toFixed(2);
    }

}

class Circle extends Figure {

    radius: number;

    constructor(figure_point_x: number,figure_point_y : number, width_figure: number, circle_radius: number){
        super(figure_point_x,figure_point_y, width_figure);
        this.radius = circle_radius;
    }

    public getPerimeter() {
        return (2 * Math.PI * this.radius).toFixed(2);
    }
    public getSquare() {
        return (Math.PI * this.width_figures / 4).toFixed(2);
    }

}

let triangle = new Triangle(0, 0, 0);
let rectangle = new Rectangle(3, 4, 3, 4);
let circle = new Circle(5, 6, 12, 34);

let figure_h;
let figure_r;

function figureSelect() {

    let checkedOption = $( "select#main_select option:checked" ).val();
    let changeFigure;

    if(checkedOption === 'Triangle') {
        changeFigure = triangle;
    } else if(checkedOption === 'Rectangle'){
        changeFigure = rectangle;
    } else {
        changeFigure = circle;
    }

    return changeFigure;
}

function disableInputs () {

    $('input[type=text]').removeClass('active');

    if (figureSelect() === triangle) {
        $('.point_x, .point_y, .width_input, .s-form-modal_go-button').addClass('active');
        return false;
    } else if (figureSelect() === rectangle) {
        $('.point_x, .point_y, .width_input, .height_input, .s-form-modal_go-button').addClass('active');
        return false;
    } else {
        $('.point_x, .point_y, .radius_input, .s-form-modal_go-button').addClass('active');
        return false;
    }

}

$('.s-form-modal_select').on('change', function(){

    disableInputs();

});


function enterInInputs() {

    let arr: any[number] = [];
    $('form input').each(function(index, elem) {
         arr.push(+($(elem).val()));
    });
    return arr;
}

let listFigure = $('.table-figure_inner');
let ulMask ='ulM_';
let nId: number;
let send = true;



$('.s-form-modal_go-button').on('click', function(e){


// переопред фигур
    triangle = new Triangle(enterInInputs()[0], enterInInputs()[1], enterInInputs()[2]);
    rectangle = new Rectangle(enterInInputs()[0], enterInInputs()[1], enterInInputs()[2], enterInInputs()[3]);
    circle = new Circle(enterInInputs()[0], enterInInputs()[1], enterInInputs()[2], enterInInputs()[4]);

    figure_h = (figureSelect() === rectangle)? rectangle.height_figures: '-';
    figure_r = (figureSelect() === circle)? circle.radius: '-';

    // ID для LocalStor
    if(e) {
        nId = 0;

        listFigure.children().not(':first-child').each(function(index, el){

            let jelId = +($(el).attr('data-itemid').slice(4));

            if(jelId > nId) {
                nId = jelId;
            }
        });
        nId++;

        let listItems =  '<ul class="table-figure_items" data-itemid="' + ulMask+nId+ '">' +
            '<li>Какой-то пункт</li>' +
            '<li>'+ $( "select#main_select option:checked" ).val() +'</li>' +
            '<li class="get_x">' + figureSelect().point_x + '</li>' +
            '<li class="get_y">' + figureSelect().point_y + '</li>' +
            '<li class="get_w">' + figureSelect().width_figures + '</li>' +
            '<li class="get_h">' + figure_h + '</li>' +
            '<li class="get_r">' + figure_r + '</li>' +
            '<li class="get_p">' + figureSelect().getPerimeter() + '</li>' +
            '<li class="get_s">' + figureSelect().getSquare() + '</li>' +
            '<li><a class="table-figure_close mdi mdi-close mdi-24px"></a></li>' +
            ' </ul>';

        localStorage.setItem(ulMask + nId, listItems);
        $('.table-figure_inner').append(listItems);
    }
});

// Забрать из сториджа елементы
function showFiguresStorage() {
    let lsLen = localStorage.length;
    if(lsLen > 0) {
        for(let i = 0; i < lsLen; i++) {
            let key = localStorage.key(i);
            if(key.indexOf(ulMask) == 0) {

                $('.table-figure_inner').append(localStorage.getItem(key));

            }
        }
    }
}
showFiguresStorage();

//закрытие и удаление со сториджа строки
$('.table-figure').on('click','.table-figure_close', function() {

    $(this).parent().parent().remove();
    localStorage.removeItem($(this).parent().parent().attr('data-itemid'));
});

//проверка формы на циферки
$("input[type=text]").keydown(function (e) {

    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }

    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

console.log(localStorage.length);
/*localStorage.clear()*/



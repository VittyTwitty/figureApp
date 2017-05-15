webpackJsonp([1],{

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(0);
var Figure = (function () {
    function Figure(figure_point_x, figure_point_y, width_figure) {
        this.point_x = figure_point_x;
        this.point_y = figure_point_y;
        this.width_figures = width_figure;
    }
    return Figure;
}());
var Triangle = (function (_super) {
    __extends(Triangle, _super);
    function Triangle(figure_point_x, figure_point_y, width_figure) {
        return _super.call(this, figure_point_x, figure_point_y, width_figure) || this;
    }
    Triangle.prototype.getPerimeter = function () {
        return (3 * this.width_figures).toFixed(2);
    };
    Triangle.prototype.getSquare = function () {
        return (Math.sqrt(3) / 4 * this.width_figures * this.width_figures).toFixed(2);
    };
    return Triangle;
}(Figure));
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(figure_point_x, figure_point_y, width_figure, height_figure) {
        var _this = _super.call(this, figure_point_x, figure_point_y, width_figure) || this;
        _this.height_figures = height_figure;
        return _this;
    }
    Rectangle.prototype.getPerimeter = function () {
        return (2 * (this.width_figures + this.height_figures)).toFixed(2);
    };
    Rectangle.prototype.getSquare = function () {
        return (this.width_figures * this.height_figures).toFixed(2);
    };
    return Rectangle;
}(Figure));
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(figure_point_x, figure_point_y, width_figure, circle_radius) {
        var _this = _super.call(this, figure_point_x, figure_point_y, width_figure) || this;
        _this.radius = circle_radius;
        return _this;
    }
    Circle.prototype.getPerimeter = function () {
        return (2 * Math.PI * this.radius).toFixed(2);
    };
    Circle.prototype.getSquare = function () {
        return (Math.PI * this.width_figures / 4).toFixed(2);
    };
    return Circle;
}(Figure));
var triangle = new Triangle(0, 0, 0);
var rectangle = new Rectangle(3, 4, 3, 4);
var circle = new Circle(5, 6, 12, 34);
var figure_h;
var figure_r;
function figureSelect() {
    var checkedOption = $("select#main_select option:checked").val();
    var changeFigure;
    if (checkedOption === 'Triangle') {
        changeFigure = triangle;
    }
    else if (checkedOption === 'Rectangle') {
        changeFigure = rectangle;
    }
    else {
        changeFigure = circle;
    }
    return changeFigure;
}
function disableInputs() {
    $('input[type=text]').removeClass('active');
    if (figureSelect() === triangle) {
        $('.point_x, .point_y, .width_input, .s-form-modal_go-button').addClass('active');
        return false;
    }
    else if (figureSelect() === rectangle) {
        $('.point_x, .point_y, .width_input, .height_input, .s-form-modal_go-button').addClass('active');
        return false;
    }
    else {
        $('.point_x, .point_y, .radius_input, .s-form-modal_go-button').addClass('active');
        return false;
    }
}
$('.s-form-modal_select').on('change', function () {
    disableInputs();
});
function enterInInputs() {
    var arr = [];
    $('form input').each(function (index, elem) {
        arr.push(+($(elem).val()));
    });
    return arr;
}
var listFigure = $('.table-figure_inner');
var ulMask = 'ulM_';
var nId;
var send = true;
$('.s-form-modal_go-button').on('click', function (e) {
    // переопред фигур
    triangle = new Triangle(enterInInputs()[0], enterInInputs()[1], enterInInputs()[2]);
    rectangle = new Rectangle(enterInInputs()[0], enterInInputs()[1], enterInInputs()[2], enterInInputs()[3]);
    circle = new Circle(enterInInputs()[0], enterInInputs()[1], enterInInputs()[2], enterInInputs()[4]);
    figure_h = (figureSelect() === rectangle) ? rectangle.height_figures : '-';
    figure_r = (figureSelect() === circle) ? circle.radius : '-';
    // ID для LocalStor
    if (e) {
        nId = 0;
        listFigure.children().not(':first-child').each(function (index, el) {
            var jelId = +($(el).attr('data-itemid').slice(4));
            if (jelId > nId) {
                nId = jelId;
            }
        });
        nId++;
        var listItems = '<ul class="table-figure_items" data-itemid="' + ulMask + nId + '">' +
            '<li>Какой-то пункт</li>' +
            '<li>' + $("select#main_select option:checked").val() + '</li>' +
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
    var lsLen = localStorage.length;
    if (lsLen > 0) {
        for (var i = 0; i < lsLen; i++) {
            var key = localStorage.key(i);
            if (key.indexOf(ulMask) == 0) {
                $('.table-figure_inner').append(localStorage.getItem(key));
            }
        }
    }
}
showFiguresStorage();
//закрытие и удаление со сториджа строки
$('.table-figure').on('click', '.table-figure_close', function () {
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


/***/ })

},[5]);
//# sourceMappingURL=indexTS.bundle.js.map
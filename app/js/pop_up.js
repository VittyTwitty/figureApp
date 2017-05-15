import $ from 'jquery';
//закрытие модального окна
$('.s-form-modal_close, .overlay').click(function () {
    $('.s-form-modal, .popup-done, .overlay').css({'opacity': '0', 'visibility': 'hidden'});
    $('.s-form-modal > .form-modal textarea').val('');

});
//показ модального окна
$('.btn_main').click(function (e) {
    e.preventDefault();
    $('.s-form-modal, .overlay').css({'opacity': '1', 'visibility': 'visible'});
});




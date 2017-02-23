var itemSource = $('#item-template').html();
var itemTemplate = Handlebars.compile(itemSource);


var addItemtoPage = function () {
	var $itemInput = $('.item-input').val();
	var $itemPrice = $('.price-input').val();
	var $imgUrl = $('.img-input').val()
	 var newHTML = itemTemplate({
	 	name: $itemInput,
        price: $itemPrice,
        image: $imgUrl
        });
	 $('.new-row').append(newHTML);
}

$('#addBtn').on('click', function () {
	addItemtoPage();
})



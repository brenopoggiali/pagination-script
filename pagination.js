$( document ).ready(function() {
var postsPerPage = 8;

var i, j, firstOfPage, postsFiltered, firstFiltered, lastFiltered;
var ultimo = postsPerPage;
var currentPage = 1;
	//Listing 'postsPerPage' posts per page at first page
	$('.searched' + '.filtrado').hide();
	for (i = 0, j = postsPerPage; i <= $(".card").length; i++) {
		if($('#' + i).is('.searched.filtrado') && j>0){
			$("#" + i).show();
			j--;
		}				
	}

/*When click at 'mercado' filter*/
	$(document).on('click','.btn-group', function() {
		currentPage = 1;
	   	var mercados = $("#mercado .active input").val();
			if(mercados === "todos-mercados"){
			    $(".card").addClass("filtrado");
			}
			else {
			    // Something different from 'Todos' selected
			    $(".card").hide();
			    $(".card").removeClass("filtrado");
					$("." + mercados).addClass("filtrado");
					$(".B2B-B2C").addClass("filtrado");
			}

		//Listing 'postsPerPage' posts per page
		$('.searched' + '.filtrado').hide();
		for (ultimo = 0, j = postsPerPage; ultimo < $(".card").length  && j>0 ; ) {
			ultimo++;
			if($('#' + ultimo).is('.searched.filtrado')){
				$("#" + ultimo).show();
				j--;
			}				
		}
		console.log("listing postsPerPage 'mercado' ultimo = " + ultimo);
	});

/*When click at 'segmento' filter */
	$(document).on('click','#segmento', function() {
		currentPage = 1;
		var i;
		var segmentos = $('#segmento').val();
		var list = document.getElementById("cases");
		var card = list.getElementsByClassName("card");

	 for (i = 0; i < card.length; i++) {
		var filtrado = card[i].classList.contains("filtrado");
	      if ((segmentos === "Todos") || card[i].classList.contains(segmentos)){
		        card[i].classList.add("searched");
	      } 
	      else {
	        card[i].style.display = "none";
	        card[i].classList.remove("searched");
	      }        
	  }

	  //Listing 'postsPerPage' posts per page
		$('.searched' + '.filtrado').hide();
		for (ultimo = 0, j = postsPerPage; ultimo < $(".card").length  && j>0 ; ) {
			ultimo++;
			if($('#' + ultimo).is('.searched.filtrado')){
				$("#" + ultimo).show();
				j--;
			}				
		}
		console.log("listing postsPerPage 'segmento' ultimo = " + ultimo);
	});

/*When any click happen at the page */
	$(document).click(function(){
	// updating env variables values 
		var firstFiltered = parseInt($('.searched.filtrado').attr('id')); //first card filtered id - used in previous button
		//last card filtered id - used in next button
			for (lastFiltered = 0; lastFiltered < $(".card").length; lastFiltered++) {
				if($('#' + lastFiltered).is('.searched.filtrado')){
				}				
			}
		postsFiltered = $('.searched.filtrado').length; //number of posts that are filtered
		firstOfPage = parseInt($(".searched.filtrado:visible").attr("id")); //first filtered that is visible

		//printing the pages number in pagination 
		$("ul.pagination > li:not(.fixed)").remove();
		for (var i = 0; i < postsFiltered; i += postsPerPage) {
			$("#number-of-pages").before('<li class="page-item"><button class="page-link page-number">'+ (parseInt(i/postsPerPage)+1) +'</button></li>');
		}

	// if inside first page
		if(firstFiltered < firstOfPage){
			$("#prev").removeClass("disabled");
			$("#prev").prop("disabled",false);
		}else{
			$("#prev").addClass("disabled");
			$("#prev").prop("disabled",true);
		}
	// if inside last page
		if(ultimo < lastFiltered){
			$("#next").removeClass("disabled");
			$("#next").prop("disabled",false);
		}else{
			$("#next").addClass("disabled");
			$("#next").prop("disabled",true);
		}
		
	//updating current page color at pagination
		$("ul.pagination > li").removeClass("active");
		$("ul.pagination > li:contains('" + currentPage + "')").addClass("active");
	});

/* When click previous button */
	$(document).on('click','#prev', function() {
		currentPage--;
		for (i = firstOfPage, j = postsPerPage; i <= ultimo && j>0; i++) {
			if($('#' + i).is('.searched.filtrado')){
				$("#" + i).hide();
				j--;
			}				
		}
		ultimo = firstOfPage - 1;
		for (i = ultimo, j = postsPerPage; i >= 0; i--) {
			if($('#' + i).is('.searched.filtrado') && j>0){
				$("#" + i).show();
				j--;
			}				
		}
		console.log("#prev click ultimo = " + ultimo);
	});
/* When click next button */
	$(document).on('click','#next', function() {
		currentPage++;
		$("#prev").removeClass("disabled");
		for (i = firstOfPage, j = postsPerPage; i <= ultimo && j>0; i++) {
			if($('#' + i).is('.searched.filtrado')){
				$("#" + i).hide();
				j--;
			}				
		}
		for (i = ultimo+1, j = postsPerPage; i <= $(".card").length && j>0; i++) {
			if($('#' + i).is('.searched.filtrado')){
				$("#" + i).show();
				j--;
				ultimo = i;
			}				
		}
		console.log("#next click ultimo = " + ultimo);
	});
/* When click pagination numbers button */
	$(document).on('click','.page-number', function(e) {
		var page = $(e.target).text();
		var changeAux = page - currentPage;
		if (changeAux > 0){
			for (var i = 1; i <= changeAux; i++) {
				$("#next").click();
			}
		}
		else if(changeAux < 0){
			for (var i = 1; i <= Math.abs(changeAux); i++) {
				$("#prev").click();
			}
		}
	});

/*When click at any filter*/
	$(document).on('click','#filtros', function() {
		postsFiltered = $('.searched.filtrado').length; //number of posts that are filtered
		//if there isn't any result;
		if(postsFiltered == 0){
			$("#error-message").removeClass("d-none");
		}
		else{
			$("#error-message").addClass("d-none");
		}	
	});
$(document).click();
});
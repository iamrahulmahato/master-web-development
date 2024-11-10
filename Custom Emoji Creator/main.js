$(".js-choice").on("click", function() {
	var type = $(this).data("type");
	var multiple = $(this).data("multiple");
	var name = $(this).data("name");

	if (multiple === "no") {
		if (type === "eyebrows" || type === "eyes") {
			var typeSingle = type.slice(0, -1);
			var parentDiv = $("div." + type);
			parentDiv.empty();
			var newDiv =
				'<div class="' +
				typeSingle +
				" left " +
				name +
				'"></div><div class="' +
				typeSingle +
				" right " +
				name +
				'"></div>';
			$(parentDiv).append(newDiv);
			$('.emoji-choices div[data-type="' + type + '"]').removeClass("selected");
			$(this).addClass("selected");
		} else if (type === "item") {
			$(".item").text("");
			$(".emoji-face")
				.find("." + type)
				.attr("class", type + " " + name);
			$('.emoji-choices div[data-type="item"]').removeClass("selected");
			$(this).addClass("selected");
		} else if (type === "skin") {
			$(".emoji-face").attr("class", "emoji-face " + " " + name);
			$('.emoji-choices div[data-type="' + type + '"]').removeClass("selected");
			$(this).addClass("selected");
		} else {
			$(".emoji-face")
				.find("." + type)
				.attr("class", type + " " + name);
			$('.emoji-choices div[data-type="' + type + '"]').removeClass("selected");
			$(this).addClass("selected");
		}
	} else {
		$(this).toggleClass("selected");
		var elementToCheck = $("div." + type + "." + name);
		if (elementToCheck.length > 0) {
			elementToCheck.remove();
		} else {
			var newDiv = '<div class="' + type + " " + name + '"></div>';
			$(".emoji-face").append(newDiv);
		}
	}
});

$(".js-custom-item").on("keyup paste", function() {
	var customItem = $(this).val();
	$('.emoji-choices div[data-type="item"]').removeClass("selected");

	$(".item").remove();
	var newDiv = '<div class="item custom">' + customItem + "</div>";
	$(".emoji-face").append(newDiv);
});

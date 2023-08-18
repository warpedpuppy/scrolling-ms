(function () {
 

	function createSegment() {
	  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	  svg.setAttributeNS(
		"http://www.w3.org/2000/xmlns/",
		"xmlns:xlink",
		"http://www.w3.org/1999/xlink"
	  );
	  svg.setAttribute("viewBox", "0 0 106.2 187.35");
	  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	  path.setAttribute("stroke", "#000000");
	  path.setAttribute("stroke-linecap", "round");
	  path.setAttribute("stroke-width", "1");
	  path.setAttribute("fill", "#000000");
	  path.setAttribute(
		"d",
		"m0,52.77v25.67S34.98,21.15,52.47,25.24s-17.86,68.84-17.86,68.84L1.49,173.33s-1.49,11.16,17.12,13.77,31.63-16.37,31.63-16.37l54.7-91.91v-26.42s-10.79,17.49-11.91,16.37,18.23-36.84,11.91-47.26S94.88-4.16,65.12,1.05,0,52.77,0,52.77Z"
	  );
	  svg.appendChild(path);
	  return svg;
	}
   
	function createBand(container, scale, speed){
	  let browserWidth = window.innerWidth;
	  let chars = [];
	  let itemWidth = 105 * scale;
	  let q = Math.ceil(browserWidth / itemWidth) + 1;
	
	  for (let i = 0; i < q; i++) {
		let svg = createSegment();
		svg.leftOffset = (i * itemWidth) - itemWidth;
		svg.style.left = `${svg.leftOffset}px`;
		chars.push(svg);
		container.appendChild(svg);
		svg = createSegment();
	  }
	  return () => {
		  for (let i = 0; i < q; i++) {
			  let item = chars[i];
			  item.leftOffset += speed;
			  chars[i].style.left = `${item.leftOffset}px`;
			  let { x } = chars[i].getBoundingClientRect();
			  if ( x > browserWidth ) {
				  let newLeft = chars[0].style.left.slice(0, -2) - itemWidth;
				  chars.splice(i, 1)
				  chars.unshift(item)
				  item.style.left = `${newLeft}px`;
				  item.leftOffset = newLeft;
			  }
	  
		  }
	  };
	}
	let band1Scroll, band2Scroll;

	function setUp(){
		band1Scroll = createBand(document.querySelector("div#container"), 1, 1)
		band2Scroll = createBand(document.querySelector("div#container2"), 0.5, 3)
		animate();
	}
	
	function animate() {
	  band1Scroll();
	  band2Scroll();
	  requestAnimationFrame(animate);
	}

	setTimeout(setUp, 2000)
	
  })();
  
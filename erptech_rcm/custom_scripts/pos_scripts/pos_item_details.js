erpnext.PointOfSale.ItemDetails = class extends erpnext.PointOfSale.ItemDetails {
	async init_child_components(){
		this.$component.html(
			`<div class="item-details-header">
				<div class="label">Item Details</div>
				<div class="close-btn">
					<svg width="32" height="32" viewBox="0 0 14 14" fill="none">
						<path d="M4.93764 4.93759L7.00003 6.99998M9.06243 9.06238L7.00003 6.99998M7.00003 6.99998L4.93764 9.06238L9.06243 4.93759" stroke="#8D99A6"/>
					</svg>
				</div>
			</div>
			<div class="item-display">
				<div class="item-name-desc-price">
					<div class="item-name"></div>
					<div class="item-desc"></div>
					<div class="item-price"></div>
				</div>
				<div class="item-image"></div>
			</div>
			<div class="discount-section"></div>
			<div class="form-container"></div>
			<div>
				<div class="btn" id="sendData" style="display: none;">Get Weight</div>
			</div>`
		)
		
		this.$item_name = this.$component.find('.item-name');
		this.$item_description = this.$component.find('.item-desc');
		this.$item_price = this.$component.find('.item-price');
		this.$item_image = this.$component.find('.item-image');
		this.$form_container = this.$component.find('.form-container');
		this.$dicount_section = this.$component.find('.discount-section');
		
		//Initialize connection with serial device
		if(window.enable_weigh_scale == 1){
			//Check if the browser supports serial device connection
			window.checkPort(false);
			if(typeof(window.mettlerWorker) == "undefined"){
				var me = this;
				window.mettlerWorker = new Worker("/assets/js/pos-mettler-toledo.min.js");
				window.mettlerWorker.onmessage = function(e){
					if(e.data.message == "No Port"){
						window.checkPort(true);
					}
					else if(e.data.message == "weight" && window.is_item_details_open){
						window.weight = e.data.weight;
						//Wait for 300ms before changing value as a hack to circumvent a bug(?)
						//where the device sends incorrect weight
						setTimeout(function(){
							me.qty_control.set_value(window.weight);
						}, 300);
					}
				}
				window.mettlerWorker.postMessage({"command": "connect"});
			}
			
			this.$component.on('click', '#sendData', () => {
				//window.sendData();
			});
			//$('#sendData').show();
		}
	}
	
	async toggle_item_details_section(item) {
		window.is_item_details_open = true;
		const current_item_changed = !this.compare_with_current_item(item);

		// if item is null or highlighted cart item is clicked twice
		const hide_item_details = !Boolean(item) || !current_item_changed;

		this.events.toggle_item_selector(!hide_item_details);
		this.toggle_component(!hide_item_details);
		
		if ((!hide_item_details && current_item_changed) || hide_item_details) {
			// if item details is being closed OR if item details is opened but item is changed
			// in both cases, if the current item is a serialized item, then validate and remove the item
			await this.validate_serial_batch_item();
        } 

		if (item && current_item_changed) {
			this.doctype = item.doctype;
			this.item_meta = frappe.get_meta(this.doctype);
			this.name = item.name;
			this.item_row = item;
			this.currency = this.events.get_frm().doc.currency;

			this.current_item = item;

			this.render_dom(item);
			this.render_discount_dom(item);
			this.render_form(item);
			this.events.highlight_cart_item(item);
			
			//Set initial weight for weigh scale
			window.old_weight = 0;			
		} else {
			this.current_item = {};
		}
		if(window.enable_weigh_scale == 1){
			window.mettlerWorker.postMessage({"command": "start"});
		}
	}
}

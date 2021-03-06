$(function () {
	$('#supported').text('Supported/allowed: ' + !!screenfull.enabled);

	if (!screenfull.enabled) {
		return false;
	}
	$('#toggle').click(function () {
		screenfull.toggle($('#container')[0]);
	});
});

$('.btn-admore').click(function () {
	$(this).toggleClass('active');
});

Notification.requestPermission();
var category_add = new Vue({
	el: '#category_add',
	data: {
		categoryType: 1,
		categoryName: null,
		categoryDesc: null,
		alertTypeNull: null,
		alertDescNull: null,
		alertNameNull: null
	},
	methods: {
		resetForm: function () {
			this.categoryType = null;
			this.categoryName = null;
			this.categoryDesc = null;
			this.alertTypeNull = null;
			this.alertDescNull = null;
			this.alertNameNull = null;
		},
		submited: function () {
			if (this.categoryDesc == null) {
				return this.alertDescNull = 'This field is required';
			}
			else if (this.categoryName == null) {
				return this.alertNameNull = 'This field is required';
			}
			else if (this.categoryType == null) {
				return this.alertTypeNull = 'This field is required';
			} else {
				axios.post('/admin/category/add', {
					type: this.categoryType,
					name: this.categoryName,
					desc: this.categoryDesc,
				})
					.then(function (response) {
						if (response.data.status === 'inserted') {
							category_add.resetForm();
							toastr.options.closeButton = true;
							toastr.success('New category inserted!');
						}
					})
					.catch(function (error) {
						toastr.options.closeButton = true;
						toastr.warning('Opps!, something went wrong');
					});
			}
		}
	}
});


if (document.getElementById('admin_index')) {
	var admin_index = new Vue({
		el: '#admin_index',
		data: {

		},
		methods: {

		},
		mounted: function () {
			axios.get('/admin/line-chart')
				.then(function (response) {
					let data = response.data;
					new Chart(document.getElementById('line-chart'), {
						type: 'line',
						data: {
							labels: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
							datasets: [{
								data: [data.sunday, data.monday, data.tueDay, data.weDay, data.thuDay, data.friDay, data.satuDay],
								label: 'Biên độ doanh thu',
								borderColor: '#52D0C4',
								fill: false
							}
							]
						},
						options: {
							title: {
								display: true,
								text: 'Đồ thị doanh thu tuần này '
							}
						}
					});
				})
				.catch(function (error) {
					throw new error;
				});
		}
	});
}

const bills = new Vue({
	el: '#bills',
	data: {
		bills: null,
		startDay: null,
		endDay: null,
		byStage: null,
		byStatus: null,
		showStage: false
	},
	methods: {
		fill: function () {
			this.startDay = $('#fill-start-day').val();
			this.endDay = $('#fill-end-day').val();
			if (this.byStage !== null && this.byStatus === null
				&& this.startDay === '' && this.endDay === '') {
				if (this.byStage === 'week') {
					axios.get('/admin/bills/week-data')
						.then((response) => {
							this.bills = response.data;
							this.byStage = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else {
					axios.get('/admin/bills/month-data')
						.then((response) => {
							this.bills = response.data;
							this.byStage = null;
						})
						.catch((error) => {
							throw new error;
						});
				}
			} else if (this.byStatus !== null && this.byStage === null
				&& this.startDay === '' && this.endDay === '') {

				if (this.byStatus == 'done') {
					axios.get('/admin/bills/status-data?status=4')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else if (this.byStatus == 'pendding') {
					axios.get('/admin/bills/status-data?status=1')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else if (this.byStatus == 'shipping') {
					axios.get('/admin/bills/status-data?status=3')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else {
					axios.get('/admin/bills/status-data?status=2')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
						})
						.catch(function (error) {
							throw new error;
						});
				}
			} else if (this.byStage !== null && this.byStatus !== 0
				&& this.startDay === '' && this.endDay === '') {
				if (this.byStage == 'week' && this.byStatus == 'done') {
					axios.get('/admin/bills/week-done-data')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
							this.byStage = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else if (this.byStage == 'week' && this.byStatus == 'pendding') {
					axios.get('/admin/bills/week-pendding-data')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
							this.byStage = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else if (this.byStage == 'week' && this.byStatus == 'shipping') {
					axios.get('/admin/bills/week-shipping-data')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
							this.byStage = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else if (this.byStage == 'week' && this.byStatus == 'confirmed') {
					axios.get('/admin/bills/week-confirm-data')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
							this.byStage = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else if (this.byStage == 'month' && this.byStatus == 'done') {
					axios.get('/admin/bills/month-done-data')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
							this.byStage = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else if (this.byStage == 'month' && this.byStatus == 'pendding') {
					axios.get('/admin/bills/month-pendding-data')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
							this.byStage = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else if (this.byStage == 'month' && this.byStatus == 'shipping') {
					axios.get('/admin/bills/month-shipping-data')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
							this.byStage = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else {
					axios.get('/admin/bills/month-confirm-data')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
							this.byStage = null;
						})
						.catch(function (error) {
							throw new error;
						});
				}
			}
			else if (this.startDay !== '' && this.endDay !== ''
				&& this.byStage == null && this.byStatus == null) {
				axios.post('/admin/bills/start-end-data', {
					startDay: this.startDay,
					endDay: this.endDay
				})
					.then((response) => {
						this.bills = response.data;
						this.startDay = null;
						this.endDay = null;
						$('#fill-start-day').val('');
						$('#fill-end-day').val('');
					})
					.catch(function (error) {
						throw new error;
					});
			}
			else if (this.startDay !== '' && this.endDay !== ''
				&& this.byStage == null && this.byStatus !== null) {
				if (this.byStatus == 'pendding') {
					axios.post('/admin/bills/start-end-pedding', {
						startDay: this.startDay,
						endDay: this.endDay
					}).then((response) => {
						this.bills = response.data;
						this.startDay = null;
						this.endDay = null;
					});
				} else if (this.byStatus == 'confirmed') {
					axios.post('/admin/bills/start-end-confirmed', {
						startDay: this.startDay,
						endDay: this.endDay
					}).then((response) => {
						this.bills = response.data;
						this.startDay = null;
						this.endDay = null;
					});
				} else if (this.byStatus == 'shipping') {
					axios.post('/admin/bills/start-end-shipping', {
						startDay: this.startDay,
						endDay: this.endDay
					}).then((response) => {
						this.bills = response.data;
						this.startDay = null;
						this.endDay = null;
					});
				} else if (this.byStatus == 'done') {
					axios.post('/admin/bills/start-end-done', {
						startDay: this.startDay,
						endDay: this.endDay
					}).then((response) => {
						this.bills = response.data;
						this.startDay = null;
						this.endDay = null;
					});
				}
			}
		}


	},
	mounted: function () {
		$('#fill-start-day').datepicker({ dateFormat: 'yy-mm-dd' });
		$('#fill-end-day').datepicker({ dateFormat: 'yy-mm-dd' });
		axios.get('/admin/bills/today-data')
			.then((response) => {
				this.bills = response.data;
			})
			.catch(function (error) {
				throw new error;
			});
	}
});


const addProduct = new Vue({
	el: '#add_product',
	data: {
		product_name: null,
		unit_price: null,
		promo_price: null,
		description: null,
		quantity: null,
		product_type: null,
		imgDetailsNum: 1,
		colors: [
			{
				code: '#F25C27',
				quantity: 1
			}
		],
		sizes: [
			{
				code: 'XL',
				quantity: 1
			}
		],
		promoPriceAlert: null,
		unitPriceAlert: null,
		quantityAlert: null

	},
	methods: {
		checkValidate: function () {
			if (this.validatePromoPrice() && this.validateUnitPrice() && this.validateQuantity()) {
				this.$refs.form.submit();
			}
		},

		validatePromoPrice: function () {
			if (isNaN(this.promo_price)) {
				this.promoPriceAlert = 'Price must be an integer value';
				return false;
			} else if (!isNaN(this.promo_price) && this.promo_price < 0) {
				this.promoPriceAlert = 'Price must be greater than 0';
				return false;
			} else if (Number(this.promo_price) >= Number(this.unit_price)) {
				this.promoPriceAlert = 'Promotion price must less than unit price';
				return false;
			}
			else {
				this.promoPriceAlert = null;
				return true;
			}

		},

		validateUnitPrice: function () {
			if (isNaN(this.unit_price)) {
				this.unitPriceAlert = 'Unit price must be an integer value';
				return false;
			} else if (!isNaN(this.unit_price) && this.unit_price < 0) {
				this.unitPriceAlert = 'Unit price must be greater than 0';
				return false;
			} else {
				this.unitPriceAlert = null;
			}
			return true;
		},

		validateQuantity: function () {
			if (isNaN(this.quantity)) {
				this.quantityAlert = 'Quantity must be an integer value';
				return false;
			}
			else if (!isNaN(this.quantity) && this.quantity < 0) {
				this.quantityAlert = 'Quantity must be greater than 0';
				return false;
			} else {
				this.quantityAlert = null;
				return true;
			}
		},
		removeColor: function (index) {
			this.colors.splice(index, 1);
		},
		adMoreColor: function () {
			this.colors.push({ code: '#F25C27', quantity: 1 });
		},
		removeSize: function (index) {
			this.sizes.splice(index, 1);
		},
		adMoreSize: function () {
			this.sizes.push({ code: 'XL', quantity: 1 });
		}
	}
});


let analytic = new Vue({
	el: '#analytic',
	data: {
		daySummary: 0,
		weekSummary: 0,
		monthSummary: 0,
		topDay: 0,
		topWeek: 0,
		topMonth: 0,
		earnedDay: 0,
		earnedWeek: 0,
		earnedMonth: 0
	},
	methods: {
		getRandomColor() {
			var letters = '0123456789ABCDEF';
			var color = '#';
			for (var i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		}
	},
	mounted: function () {

		axios.get('/admin/analytic-data')
			.then((response) => {

				this.earnedDay = response.data.dayEarn;
				this.earnedWeek = response.data.weekEarn;
				this.earnedMonth = response.data.monthEarn;
				this.daySummary = response.data.daySum;
				this.weekSummary = response.data.weekSum;
				this.monthSummary = response.data.monthSum;
				this.topDay = response.data.days;
				this.topWeek = response.data.week;
				this.topMonth = response.data.month;

				let label = [];
				let summary = [];
				let bg_color = [];

				response.data.chart.forEach(item => {
					label.push(item._id);
					summary.push(item.total);
					bg_color.push(this.getRandomColor());
				});
				new Chart(document.getElementById('pie-chart-men'), {
					type: 'pie',
					data: {
						labels: label,
						datasets: [{
							label: 'Population (millions)',
							backgroundColor: bg_color,
							data: summary
						}]
					},
					options: {
						title: {
							display: true,
							text: 'Tỷ lệ loại sản phẩm bán ra'
						}
					}
				});
			});
	}
});


let list_product = new Vue({
	el: '#list_product',
	data: {
		list: [],
		curretnPage: 1,
		totalPages: 5
	},

	methods: {
		paginate: function (page) {
			axios.get(`/admin/product/list-data?pages=${page}`)
				.then((response) => {
					this.list = response.data.products;
					this.totalPages = response.data.pages;
					this.curretnPage = response.data.currentPages;
				});
		},

		removeProduct: function (id) {
			swal({
				title: 'Bạn có chắc chắn muốn xóa ?',
				text: 'Loại sản phẩm này sẽ bị xóa bỏ khỏi hệ thống!',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			})
				.then((willDelete) => {
					if (willDelete) {
						axios.get(`/admin/product/remove/${id}`)
							.then((response) => {
								this.list = response.data.products;
								this.totalPages = response.data.pages;
								this.curretnPage = response.data.currentPages;
							});
					} else {
						swal('Hủy xóa thành công!');
					}
				});
		}
	},

	mounted: function () {
		axios.get('/admin/product/list-data')
			.then((response) => {
				this.list = response.data.products;
				this.totalPages = response.data.pages;
				this.curretnPage = response.data.currentPages;
			});
	}
});


let list_category = new Vue({
	el: '#list_category',
	data: {
		list: [],
		curretnPage: 1,
		totalPages: 5
	},

	methods: {
		paginate: function (page) {
			axios.get(`/admin/category/list-data?pages=${page}`)
				.then((response) => {
					this.list = response.data.category;
					this.totalPages = response.data.pages;
					this.curretnPage = response.data.currentPages;
				});
		},
		removeCategory: function (id) {

			swal({
				title: 'Bạn có chắc chắn muốn xóa ?',
				text: 'Loại sản phẩm này sẽ bị xóa bỏ khỏi hệ thống!',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			})
				.then((willDelete) => {
					if (willDelete) {
						axios.get(`/admin/category/remove/${id}`)
							.then((response) => {
								this.list = response.data.category;
								this.totalPages = response.data.pages;
								this.curretnPage = response.data.currentPages;
								swal('Xóa thành công!', {
									icon: 'success',
								});
							});
					} else {
						swal('Hủy xóa thành công!');
					}
				});
		}
	},

	mounted: function () {
		axios.get('/admin/category/list-data')
			.then((response) => {
				this.list = response.data.category;
				this.totalPages = response.data.pages;
				this.curretnPage = response.data.currentPages;
			});
	}
});



let list_users = new Vue({
	el: '#list_users',
	data: {
		list: [],
		curretnPage: 1,
		totalPages: 5
	},

	methods: {
		paginate: function (page) {
			axios.get(`/admin/user/list/data?pages=${page}`)
				.then((response) => {
					this.list = response.data.users;
					this.totalPages = response.data.pages;
					this.curretnPage = response.data.currentPages;
				});
		},
		removeCategory: function (id) {

			swal({
				title: 'Bạn có chắc chắn muốn xóa ?',
				text: 'Tài khoản này sẽ bị xóa bỏ khỏi hệ thống!',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			})
				.then((willDelete) => {
					if (willDelete) {
						axios.get(`/admin/user/remove/${id}`)
							.then((response) => {
								this.list = response.data.users;
								this.totalPages = response.data.pages;
								this.curretnPage = response.data.currentPages;
								swal('Xóa thành công!', {
									icon: 'success',
								});
							});
					} else {
						swal('Hủy xóa thành công!');
					}
				});
		}
	},

	mounted: function () {
		axios.get('/admin/user/list/data')
			.then((response) => {
				this.list = response.data.users;
				this.totalPages = response.data.pages;
				this.curretnPage = response.data.currentPages;
			});
	}
});


let notifications = new Vue({
	el: '#notifications',
	data: {
		notis: [],
	},
	methods: {
		fetchNoti: function () {
			axios.get('/admin/notifications')
				.then((response) => {
					this.notis = response.data.notis;
				});
		},
		watched: function (id) {
			axios.get(`/admin/notifications/watched/${id}`)
				.then((response) => {
					this.notis = response.data.notis;
				});
		}
	},
	mounted: function () {
		axios.get('/admin/notifications')
			.then((response) => {
				this.notis = response.data.notis;
			});
	}
});

var socket = io('/');
socket.on('notifiNewBills', (data) => {
	notify = new Notification(
		'Havana Admin',
		{
			body: 'Có đơn đặt hàng mới chưa được xử lý!',
			icon: 'https://freeiconshop.com/wp-content/uploads/edd/notification-flat.png',
			tag: '/admin/bills/index'
		}
	);
	notify.onclick = function () {
		window.location.href = this.tag;
	};

	axios.post('/admin/notifications/add', {
		content: 'Có đơn đặt hàng mới chưa được xử lý!'
	})
		.then((response) => {
			notifications.fetchNoti();
		});

});


socket.on('notifiNewUser', (data) => {
	notify = new Notification(
		'Havana Admin',
		{
			body: 'Có người dùng đăng ký mới !',
			icon: 'https://freeiconshop.com/wp-content/uploads/edd/notification-flat.png',
			tag: '/admin'
		}
	);
	notify.onclick = function () {
		window.location.href = this.tag;
	};

	axios.post('/admin/notifications/add', {
		content: 'Có đơn đặt hàng mới chưa được xử lý!'
	})
		.then((response) => {
			notifications.fetchNoti();
		});

});


let edit_product = new Vue({
	el: '#edit_product',
	data: {
		product: {},
		sizes: ["XXL", "XL", "L", "M", "S"],
		imgDetailsNum: 1,
	},
	methods: {
		removeColor: function (index) {
			this.product.colors.splice(index, 1);
		},
		adMoreColor: function () {
			this.product.colors.push({ code: '#F25C27', quantity: 1 });
		},
		removeSize: function (index) {
			this.product.size.splice(index, 1);
		},
		adMoreSize: function () {
			this.product.size.push({ code: 'XL', quantity: 1 });
		}
	},
	mounted: function () {
		let id = $('#curentId').val();
		axios.get(`/admin/product/edit-data/${id}`)
			.then((response) => {
				this.product = response.data.productInfor;
			});
	}
});

let user_add = new Vue({
	el: '#user_add',
	data: {
		alertRepass: '',
		userName: '',
		phone: '',
		email: '',
		password: '',
		address: '',
		repass: '',
		userRight: 4
	},
	methods: {
		addUser: function () {
			axios.post('/admin/user/add', {
				username: this.userName,
				useraddress: this.address,
				useremail: this.email,
				password: this.password,
				userphone: this.userphone,
				userRight: this.userRight
			})
				.then((response) => {
					if (response.status === 200) {
						toastr.options.closeButton = true;
						toastr.success('New user inserted!');
						this.alertRepass = '';
						this.userName = '';
						this.phone = '';
						this.email = '';
						this.password = '';
						this.address = '';
						this.repass = '';
					} else {
						toastr.options.closeButton = true;
						toastr.error('Opps, Something went wrong!');
					}
				});
		}
	}
});

let bill_details = new Vue({
	el: '#bill_details',
	data: {
		details: [],
		id: '',
		status: 1,
		list: []
	},
	mounted: function () {
		let id = $('#current_bill_id').val();
		axios.get(`/admin/bills/single/detail-data/${id}`)
			.then((response) => {
				this.details = response.data.bill.detais;
				this.id = id;
				this.status = response.data.bill.status;
				let tmp = [];
				for (i = this.status; i <= 4; i++) {
					tmp.push(i);
				}
				this.list = tmp;
			});
	},
	methods: {
		removeItem: function (itemId) {

			swal({
				title: 'Xóa sản phẩm này ?',
				text: 'Đơn hàng của khách hàng bị thay đổi !',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			})
				.then((willDelete) => {
					if (willDelete) {
						axios.patch(`/admin/bills/single/remove/item/${this.id}`, { itemId: itemId })
							.then((response) => {
								if (response.data.status !== 200) {
									toastr.options.closeButton = true;
									toastr.error('Opps! something went wrong!');
								}
								else {
									toastr.options.closeButton = true;
									toastr.success('Success !');
									this.details = response.data.bill.detais;
								}
							});
					} else {
						swal('Hủy xóa thành cônng !');
					}
				});


		},
		updateItem: function (index, itemId) {
			swal({
				title: 'Cập nhật sản phẩm này ?',
				text: 'Đơn hàng của khách hàng sẽ bị thay đổi!',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			})
				.then((willDelete) => {
					if (willDelete) {
						let data = [];
						this.details.map(item => {
							data.push({
								product_id: item.product_id._id,
								category_name: item.category_name,
								product_name: item.product_name,
								price: item.price,
								quantity: item.quantity,
								colors: item.colors,
								size: item.size
							});
						});

						axios.patch('/admin/bills/single/update/item', {
							billId: this.id,
							itemId: itemId,
							dataUpdate: data
						})
							.then((response) => {
								console.log(response);
								if (response.data.status === 200) {
									this.details = response.data.bill.detais;
									toastr.options.closeButton = true;
									toastr.success('Success !');
								} else {
									toastr.options.closeButton = true;
									toastr.error('Opps! something went wrong!');
								}
							});
					} else {
						swal('Cancled !');
					}
				});
		},
		removeBill: function (id) {
			swal({
				title: 'Xóa bỏ đơn hàng này ?',
				text: 'Đơn hàng của khách hàng sẽ xóa bỏ !',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			})
				.then((willDelete) => {
					if (willDelete) {
						axios.delete(`/admin/bills/${id}`)
							.then((response) => {
								if (response.data.status !== 200) {
									toastr.options.closeButton = true;
									toastr.error('Opps! something went wrong!');
								} else {
									toastr.options.closeButton = true;
									toastr.success('Success !');
									setTimeout(() => {
										location.href = '/admin/bills/index';
									}, 2000);
								}
							});
					} else {
						swal('Hủy xóa thành cônng !');
					}
				});
		},
		updateStatus: function (status) {

			swal({
				title: 'Cập nhật trạng thái đơn hàng này ?',
				text: 'Đơn hàng của khách hàng thay đổi trạng thái !',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			})
				.then((willDelete) => {
					if (willDelete) {
						axios.patch(`/admin/bills/single/update/status/${this.id}`, { status: status })
							.then((response) => {
								if (response.data.status !== 200) {
									toastr.options.closeButton = true;
									toastr.error('Opps! something went wrong!');
								}
								else {
									this.status = response.data.bill.status;
									let tmp = [];
									for (i = this.status; i <= 4; i++) {
										tmp.push(i);
									}
									this.list = tmp;
									toastr.options.closeButton = true;
									toastr.success('Cập nhật trạng thái thành công !');
								}
							});
					} else {
						swal('Hủy cập nhật thành cônng !');
					}
				});
		}
	}
});
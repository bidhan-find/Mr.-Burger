import axios from 'axios';
import moment from 'moment';
import Noty from 'noty';

function initAdmin(socket) {
    const orderTableBody = document.querySelector('#adminOrderTableBody');
    let orders = [];
    let markap;

    // get all orders
    axios
        .get('/admin/orders', {
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(res => {
            orders = res.data;
            markap = generateMarkap(orders);
            orderTableBody.innerHTML = markap;
        }).catch(err => {
            new Noty({
                type: "error",
                timeout: 800,
                text: "Something went wrong",
                progressBar: false
            }).show();
        })

    function renderItems(items) {
        let parsedItems = Object.values(items);
        return parsedItems.map((menuItem) => {
            return `
                        <p>${menuItem.item.name} - ${menuItem.qty} pcs </p>
                    `
        }).join('');
    };

    function generateMarkap(orders) {
        return orders.map((order, index) => {
            return `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>
                        <p class="order_id">Order Id: ${order._id}</p>
                        <div>
                            ${renderItems(order.items)}
                        </div>
                    </td>
                    <td>${order.customerId.name}</td>
                    <td>${order.address}</td>
                    <td>
                        <form action="/admin/order/status" method="POST" class="admin_order_form">
                            <input type="hidden" name="orderId" value="${order._id}">
                            <select name="status" onchange="this.form.submit()" class="form-select">
                                <option value="order_placed" ${order.status === 'order_placed' ? 'selected' : ''}>
                                    Placed
                                </option>
                                <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>
                                    Confirmed
                                </option>
                                <option value="prepared" ${order.status === 'prepared' ? 'selected' : ''}>
                                    Prepared
                                </option>
                                <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>
                                    Delivered
                                </option>
                                <option value="completed" value="completed" ${order.status === 'completed' ? 'selected' : ''}>
                                    Completed
                                </option>
                            </select>
                        </form>
                    </td>
                    <td>${moment(order.createdAt).format('hh:mm A -- DD-MM-YYYY')}</td>
                </tr>
            `;
        }).join('');
    };

    socket.on('orderPlaced', (order) => {
        new Noty({
            type: "success",
            timeout: 3000,
            text: "New order!!",
            progressBar: false
        }).show();
        orders.unshift(order);
        orderTableBody.innerHTML = '';
        orderTableBody.innerHTML = generateMarkap(orders);
    });
};

export default initAdmin;
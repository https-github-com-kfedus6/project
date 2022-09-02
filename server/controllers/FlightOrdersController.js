const { FlightOrder, Flight } = require("../models/models");
const ErrorApi = require("../error/ErrorApi");

class FlightOrdersController {
    static Add = async (req, resp, next) => {
        try {
            const { flightId, authorName, countTicket, phone } = req.body;
            const res = await FlightOrder.create({ authorName, countTicket, phone, flightId });
            return resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static getOrders = async (req, resp, next) => {
        try {
            let { page, limit } = req.query
            if (page === undefined) {
                page = 1
            }
            if (limit === undefined) {
                limit = 2
            }

            const offset = page * limit - limit

            const res = await FlightOrder.findAndCountAll({ limit: Number(limit), offset: Number(offset) });

            return resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static SetStatus = async (req, resp, next) => {
        try {
            const { status, id } = req.body;
            console.log(status, id)
            const response = await FlightOrder.update({ status: status }, { where: { id } });
            if (status) {
                const flight = await Flight.findOne({ where: { id: response.flightId } });
                const countFreePlace = flight.countFreePlace - response[0].countTicket;
                await Flight.update({ countFreePlace }, { where: { id: flight.id } });
            }
            const res = await FlightOrder.findAll()
            return resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    static deleteOrder = async (req, resp, next) => {
        try {
            const { id } = req.params
            console.log("ID", id)
            console.log('HELLO')
            await FlightOrder.destroy({ where: { id: id } })
            const res = FlightOrder.findAll()
            return resp.json({ status: 200, res });
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
}

module.exports = FlightOrdersController
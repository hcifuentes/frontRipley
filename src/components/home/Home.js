import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import CityComponent  from '../city/City';

const SERVER = "http://ec2-18-144-47-113.us-west-1.compute.amazonaws.com"; // http:localhost // funcionamiento local
const WEBSOCKETPORT = ":3001";
const WEBSERVICESPORT = ":3000";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            response: true,
            endpointSocket: SERVER + WEBSOCKETPORT,
            endpointServices: SERVER + WEBSERVICESPORT,
            cities: [],
            timer : null
        };
    }

    componentDidMount() {
        this.setTimer();
        this.connectSocket();
        this.getActualData();
    }

    setTimer() {
        var timer = setInterval(() => {
            this.reloadData();
        }, 10000);
        this.setState({timer: timer});
    }

    connectSocket() {
        const { endpointSocket } = this.state;
        const socket = socketIOClient(endpointSocket);
        socket.on('pop', (data) => {
            console.log(data);
            this.updateCity(data);
        });
    }

    getActualData() {
        const { endpointServices } = this.state;
        fetch(endpointServices + '/all')
	    .then(response => response.json())
        .then(json => {
            var cities = json.data;
            for(const city in cities) {
                this.updateCity(cities[city]);
            }
        });
    }

    reloadData() {
        const { endpointServices } = this.state;
        fetch(endpointServices + '/reload')
	    .then(response => response.json())
        .then(json => {
    	    console.log(json);
        })
        .then((recurso) => {
    	    console.log(recurso)
        })
    }

    updateCity(nuevaData) {
        const array = this.state.cities;
        var existe = false;

        array.map(function (dataPrev) {
            if (dataPrev._code === nuevaData._code) {
                dataPrev._tz = nuevaData._tz;
                dataPrev._temp = nuevaData._temp;
                existe = true;
            }
            return dataPrev;
        });

        if(!existe) {
            array.push(JSON.parse(nuevaData));
        }
        
        this.setState({
            cities: array,
        })
    }

    getHoraActual(tz) {
        const utc = new Date(new Date().getUTCMilliseconds())
        console.log(new Date(utc));
        const enTz = new Date().getTime() + tz * 60 * 60 * 1000;
        return new Date(enTz);
    }

    render() {
        const { cities } = this.state;
        return (
            <div>
                {cities.map(function (d, idx) {
                    return (
                        <CityComponent key={idx} city={d}/>
                    )
                })}
            </div>
        );
    }
}

export default Home;
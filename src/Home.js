import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            response: true,
            endpoint: "http://127.0.0.1:3001",
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
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on('pop', (data) => {
            this.updateCity(data);
        });
    }

    getActualData() {
        fetch('http://localhost:3000/all')
	    .then((response) => {
            console.log(response.body);
            for(const city of response.body) {
                this.updateCity(city);
            }
        })
        .then((recurso) => {
    	    console.log(recurso)
        })
    }

    reloadData() {
        fetch('http://localhost:3000/reload')
	    .then((response) => {
    	    console.log(response);
        })
        .then((recurso) => {
    	    console.log(recurso)
        })
    }

    updateCity(nuevaData) {
        const array = this.state.cities;
        console.log(array);
        var existe = false;
        array.map(function (dataPrev) {
            console.log(dataPrev._code, nuevaData._code, dataPrev._code === nuevaData._code)
            if (dataPrev._code === nuevaData._code) {
                dataPrev._tz = nuevaData._tz;
                dataPrev._temp = nuevaData._temp;
                dataPrev._horaActual = this.getHoraActual(nuevaData._tz)
                existe = true;
            }

            return dataPrev;
        });

        if(!existe) {
            array.push(nuevaData);
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
                        <li key={idx}>{d._name} , {d._temp} , {d._tz}, {d._horaActual}</li>)
                })}
            </div>
        );
    }
}

export default Home;
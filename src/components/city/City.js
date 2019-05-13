import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    maxWidth: '187px',
    display: 'inline-block'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};


class CityComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  localHour(tz) {
    const browserDate = new Date();
    const browserMilis = browserDate.getTime()
    const browserTz = browserDate.getTimezoneOffset();
    const utc = new Date(browserMilis + (browserTz * 60 * 1000));
    const actualDate = new Date(new Date(utc.getTime() + tz * 60 * 60 * 1000));
    return (actualDate.getHours() < 10 ? '0' + actualDate.getHours() : actualDate.getHours()) + ':'+
           (actualDate.getMinutes() < 10 ? '0' + actualDate.getMinutes() : actualDate.getMinutes());
  }

  temperatures(temp) {
    return temp + ' F° / ' + ((temp-32) / 1.8).toFixed(0) + ' C°';
  }

  render() {
    return (
      <Card>
        <CardContent>
          <Typography color="textPrimary" gutterBottom>
            {this.props.city._name}
          </Typography>
          <Typography color="textPrimary" gutterBottom>
            Temperatura: {this.props.city._temp ? this.temperatures(this.props.city._temp) : 'Obteniendo Data'}
          </Typography>
          <Typography color="textPrimary" gutterBottom>
            Hora Local: {this.props.city._tz ? this.localHour(this.props.city._tz) : 'Obteniendo Data'}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

CityComponent.defaultProps = {};

export default withStyles(styles)(CityComponent);
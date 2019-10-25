import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";

import YouTube from 'react-youtube';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    top: {
        width: '100%',
        padding: 10,
        textAlign: 'center'
    },
    searchWrapper: {
        width: 400,
    },
    search: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    leftPanel: {
        display: 'flex',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    button: {
        margin: theme.spacing(1),
    },

    play: {
        height: 30,
        margin: theme.spacing(1),
        padding: 2,
    }

}));


function App() {
    const classes = useStyles();
    const opts = {
        height: '390',
        width: '640',
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 1
        }
    };

    return (
        <Grid container justify="center"  className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Container className={classes.top}>
                    <Container className={classes.searchWrapper}>
                        <Paper className={classes.search}>
                            <IconButton className={classes.iconButton} aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <InputBase
                                className={classes.input}
                                placeholder="Search Youtube Videos"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <IconButton className={classes.iconButton} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <Divider className={classes.divider} orientation="vertical" />
                            <Button variant="contained" className={classes.button}>
                                Search
                            </Button>
                        </Paper>
                    </Container>
                </Container>
             </Grid>

            <Grid item xs={12}>
                <Grid container justify="center" spacing={4}>
                    <Grid key='list' item>
                        <Container className={classes.leftPanel}>
                            <img/>
                            <ul>
                                <li>Song name</li>
                                <li>Song Desc</li>
                                <li>Total Votes</li>
                            </ul>
                            <Button variant="contained" className={classes.play}>
                                <PlayCircleOutlineIcon/>
                            </Button>
                        </Container>
                    </Grid>
                    <Grid key='player' item>
                        <YouTube
                            videoId="Q5BQTj4pzZo"
                            opts={opts}
                            onReady={e => (e.target.pauseVideo())}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default App;

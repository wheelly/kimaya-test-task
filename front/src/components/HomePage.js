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
import { useSelector } from 'react-redux'
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

async function onQSend(props, classes, value, nodeToRender, nodeYouTube) {
    try {
        const res = await props.runSearch(q)

        return (
            <Container className={classes.leftPanel}>
                { res.items.map( e =>
                        (
                        <li>
                            <img/>
                            <ul>
                                <li>{e.snippet.title}</li>
                                <li>{e.snippet.description}</li>
                            </ul>
                            <Button
                                variant="contained"
                                className={classes.play}
                                onClick={() => nodeYouTube.videoId=e.id.videoId }>
                            <PlayCircleOutlineIcon/>
                            </Button>
                        </li>
                        )
                    )
                }
            </Container>
        )
    } catch (e) {
        console.log(e)
    }
}

function HomePage(props) {
    const classes = useStyles();
    const opts = {
        height: '390',
        width: '640',
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 1
        }
    };

    const qRef = React.createRef();
    const renderToRef = React.createRef()
    const youTubeRef = React.createRef();

    return (
        <Grid container justify="center"  className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Container className={classes.top}>
                    <Container className={classes.searchWrapper}>
                        <Paper className={classes.search}>
                            <IconButton aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <InputBase
                                ref={qRef}
                                className={classes.input}
                                placeholder="Search Youtube Videos"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <IconButton aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <Divider className={classes.divider} orientation="vertical" />
                            <Button variant="contained" className={classes.button} onClick={
                                () => onQSend(props, classes, qRef.current.value(), renderToRef.current, youTubeRef.current)
                            }>
                                Search
                            </Button>
                        </Paper>
                    </Container>
                </Container>
            </Grid>

            <Grid item xs={12}>
                <Grid container justify="center" spacing={4}>
                    <Grid key='list' item ref={renderToRef} >

                    </Grid>
                    <Grid key='player' item>
                        <YouTube
                            ref={youTubeRef}
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

export default HomePage;
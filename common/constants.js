const EVENTS = {
	IS_NIGHT: 'isNight',
	SUNRISE: 'sunrise',
	SUNSET: 'sunset'
};

const COLOR = {
	IS_DEFAULT: [0, 0, 0, 1],
	IS_WARNING: [100, 0, 0, 100]
}

const ID = {
	IS_HEART: 'heart',
	IS_EYE: 'eye',
	IS_REDSHIFT: 'redshift'
};

const ICON = {
	PAUSE: {
		path : { // blue heart
	    	"19": "icons/heartBlue19.png",
	    	"38": "icons/heartBlue38.png",
	    	"16": "icons/heartBlue16.png",
	    	"32": "icons/heartBlue32.png"
		}
	},
	PLAY: { // red heartbeat
		path : {
	    	"19": "icons/heartbeatRed19.png",
	    	"38": "icons/heartbeatRed38.png",
	    	"16": "icons/heartbeatRed16.png",
	    	"32": "icons/heartbeatRed32.png"
		}
	}
}

const MODE = {
	IS_PLAY: 'play',
	IS_PAUSE: 'pause'
}

const A_MILLISECOND = 1,
	A_SECOND = 1000*A_MILLISECOND,
	A_MINUTE = 60*A_SECOND,
	AN_HOUR = 60*A_MINUTE,
	A_DAY = 24*AN_HOUR;

const TIME = {
	A_MILLISECOND: A_MILLISECOND,
 	A_SECOND: A_SECOND,
 	A_MINUTE: A_MINUTE,
 	AN_HOUR: AN_HOUR,
 	A_DAY: A_DAY
};

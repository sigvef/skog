var trainParts = [{
    name: 'front_left_wheel0',
    type: 'wheel',
    offset: new THREE.Vector3(-19.15, 5, 0),
    initPos: {
    	x: 0,
    	y: 0,
    	z: -80000
    },
    animations: [
     {
        start: 4000,
        end: 6000,
        fromPos: {
            x: 0,
            y: 0,
            z: -800
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }
   ]
}, {
    name: 'front_left_wheel1',
    type: 'wheel',
    initPos: {
    	x: 0,
    	y: 0,
    	z: -80000
    },
    animations: [{
        start: 4250,
        end: 6250,
        fromPos: {
            x: 0,
            y: 0,
            z: -800
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ],
    offset: new THREE.Vector3(-12.7, 5, 0)
}, {
    name: 'front_right_wheel0',
    type: 'wheel',
    initPos: {
    	x: 0,
    	y: 0,
    	z: 80000
    },
    animations: [{
        start: 5000,
        end: 7000,
        fromPos: {
            x: 0,
            y: 0,
            z: 800
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ],
    offset: new THREE.Vector3(-19.15, 5, 0)
}, {
    name: 'front_right_wheel1',
    type: 'wheel',
    initPos: {
    	x: 0,
    	y: 0,
    	z: 80000
    },
    animations: [{
        start: 5250,
        end: 7250,
        fromPos: {
            x: 0,
            y: 0,
            z: 800
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ],
    offset: new THREE.Vector3(-12.7, 5, 0)
}, {
    name: 'middle_left_wheel0',
    type: 'wheel',
    initPos: {
    	x: 0,
    	y: 0,
    	z: -80000
    },
    animations: [{
        start: 7000,
        end: 9000,
        fromPos: {
            x: 0,
            y: 0,
            z: -800
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ],
    offset: new THREE.Vector3(-1.1, 5, 0)
}, {
    name: 'middle_left_wheel1',
    type: 'wheel',
    initPos: {
    	x: 0,
    	y: 0,
    	z: -80000
    },
    animations: [{
        start: 7250,
        end: 9250,
        fromPos: {
            x: 0,
            y: 0,
            z: -800
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ],
    offset: new THREE.Vector3(5.4, 5, 0)
}, {
    name: 'middle_right_wheel0',
    type: 'wheel',
    initPos: {
    	x: 0,
    	y: 0,
    	z: 80000
    },
    animations: [{
        start: 6000,
        end: 8000,
        fromPos: {
            x: 0,
            y: 0,
            z: 800
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ],
    offset: new THREE.Vector3(-1.1, 5, 0)
}, {
    name: 'middle_right_wheel1',
    type: 'wheel',
    initPos: {
    	x: 0,
    	y: 0,
    	z: 80000
    },
    animations: [{
        start: 6250,
        end: 8250,
        fromPos: {
            x: 0,
            y: 0,
            z: 800
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ],
    offset: new THREE.Vector3(5.4, 5, 0)
}, {
    name: 'rear_left_wheel0',
    type: 'wheel',
    initPos: {
    	x: 0,
    	y: 0,
    	z: -80000
    },
    animations: [{
        start: 8000,
        end: 10000,
        fromPos: {
            x: 0,
            y: 0,
            z: -800
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ],
    offset: new THREE.Vector3(16.6, 5, 0)
}, {
    name: 'rear_left_wheel1',
    type: 'wheel',
    initPos: {
    	x: 0,
    	y: 0,
    	z: -80000
    },
    animations: [{
        start: 8250,
        end: 10250,
        fromPos: {
            x: 0,
            y: 0,
            z: -800
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ],
    offset: new THREE.Vector3(23.1, 5, 0)
}, {
    name: 'rear_right_wheel0',
    type: 'wheel',
    initPos: {
    	x: 0,
    	y: 0,
    	z: 80000
    },
    animations: [{
        start: 9000,
        end: 11000,
        fromPos: {
            x: 0,
            y: 0,
            z: 800
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ],
    offset: new THREE.Vector3(16.6, 5, 0)
}, {
    name: 'rear_right_wheel1',
    type: 'wheel',
    initPos: {
    	x: 0,
    	y: 0,
    	z: 80000
    },
    animations: [{
        start: 9250,
        end: 11250,
        fromPos: {
            x: 0,
            y: 0,
            z: 800
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ],
    offset: new THREE.Vector3(23.1, 5, 0)
}, {
    name: 'chimney',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 16250,
        end: 18250,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }]
}, {
    name: 'cube0',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 15500,
        end: 17500,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }]
}, {
    name: 'cube1',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 14250,
        end: 16250,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }]
}, {
    name: 'cube2',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 14000,
        end: 16000,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }]
}, {
    name: 'cube3',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 13750,
        end: 15750,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }]
}, {
    name: 'front_body',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 1000,
        end: 3000,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ]
}, {
    name: 'front_bullet',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 15750,
        end: 17750,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }]
}, {
    name: 'front_plate',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 15250,
        end: 17250,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }]
}, {
    name: 'hook0',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 1500,
        end: 3500,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ]
}, {
    name: 'hook1',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 2500,
        end: 4500,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ]
}, {
    name: 'lower_plate',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 14500,
        end: 16500,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }]
}, {
    name: 'middle_body',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 2000,
        end: 4000,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ]
}, {
    name: 'middle_plate',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 14750,
        end: 16750,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }]
}, {
    name: 'pole0',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 11250,
        end: 13250,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }]
}, {
    name: 'pole1',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 11000,
        end: 13000,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }]
}, {
    name: 'pole2',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 10750,
        end: 12750,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }]
}, {
    name: 'pole3',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 10500,
        end: 12500,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }]
}, {
    name: 'pole4',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 10250,
        end: 12250,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }]
}, {
    name: 'pole5',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 10000,
        end: 12000,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ]
}, {
    name: 'rear_body',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 3000,
        end: 5000,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ]
}, {
	name: 'roof0',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
	animations: [{
        start: 16000,
        end: 18000,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }]
}, {
    name: 'roof1',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 15125,
        end: 17125,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }]
}, {
    name: 'roof2',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 15375,
        end: 17375,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }]
}, {
    name: 'roof3',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 15625,
        end: 17625,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }]
}, {
    name: 'upper_plate',
    initPos: {
    	x: 0,
    	y: 10000,
    	z: 0
    },
    animations: [{
        start: 15000,
        end: 17000,
        fromPos: {
            x: 0,
            y: 400,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }]
}];
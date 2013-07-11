var trainParts = [{
    name: 'front_left_wheel0',
    type: 'wheel',
    offset: new THREE.Vector3(-19.15, 5, 0),
    animations: [{
        start: 0,
        end: 4000,
        fromPos: {
            x: 0,
            y: 0,
            z: -100
        },
        toPos: {
            x: 0,
            y: 0,
            z: -100
        }
    }, {
        start: 4000,
        end: 6000,
        fromPos: {
            x: 0,
            y: 0,
            z: -100
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ]
}, {
    name: 'front_left_wheel1',
    type: 'wheel',
    animations: [{
        start: 0,
        end: 4250,
        fromPos: {
            x: 0,
            y: 0,
            z: -100
        },
        toPos: {
            x: 0,
            y: 0,
            z: -100
        }
    }, {
        start: 4250,
        end: 6250,
        fromPos: {
            x: 0,
            y: 0,
            z: -100
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
    animations: [{
        start: 0,
        end: 5000,
        fromPos: {
            x: 0,
            y: 0,
            z: 100
        },
        toPos: {
            x: 0,
            y: 0,
            z: 100
        }
    }, {
        start: 5000,
        end: 7000,
        fromPos: {
            x: 0,
            y: 0,
            z: 100
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
    animations: [{
        start: 0,
        end: 5250,
        fromPos: {
            x: 0,
            y: 0,
            z: 100
        },
        toPos: {
            x: 0,
            y: 0,
            z: 100
        }
    }, {
        start: 5250,
        end: 7250,
        fromPos: {
            x: 0,
            y: 0,
            z: 100
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
    animations: [{
        start: 0,
        end: 7000,
        fromPos: {
            x: 0,
            y: 0,
            z: -100
        },
        toPos: {
            x: 0,
            y: 0,
            z: -100
        }
    }, {
        start: 7000,
        end: 9000,
        fromPos: {
            x: 0,
            y: 0,
            z: -100
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
    animations: [{
        start: 0,
        end: 7250,
        fromPos: {
            x: 0,
            y: 0,
            z: -100
        },
        toPos: {
            x: 0,
            y: 0,
            z: -100
        }
    }, {
        start: 7250,
        end: 9250,
        fromPos: {
            x: 0,
            y: 0,
            z: -100
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
    animations: [{
        start: 0,
        end: 6000,
        fromPos: {
            x: 0,
            y: 0,
            z: 100
        },
        toPos: {
            x: 0,
            y: 0,
            z: 100
        }
    }, {
        start: 6000,
        end: 8000,
        fromPos: {
            x: 0,
            y: 0,
            z: 100
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
    animations: [{
        start: 0,
        end: 6250,
        fromPos: {
            x: 0,
            y: 0,
            z: 100
        },
        toPos: {
            x: 0,
            y: 0,
            z: 100
        }
    }, {
        start: 6250,
        end: 8250,
        fromPos: {
            x: 0,
            y: 0,
            z: 100
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
    animations: [{
        start: 0,
        end: 11000,
        fromPos: {
            x: 0,
            y: 0,
            z: -100
        },
        toPos: {
            x: 0,
            y: 0,
            z: -100
        }
    }, {
        start: 11000,
        end: 13000,
        fromPos: {
            x: 0,
            y: 0,
            z: -100
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
    animations: [{
        start: 0,
        end: 11250,
        fromPos: {
            x: 0,
            y: 0,
            z: -100
        },
        toPos: {
            x: 0,
            y: 0,
            z: -100
        }
    }, {
        start: 11250,
        end: 13250,
        fromPos: {
            x: 0,
            y: 0,
            z: -100
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
    animations: [{
        start: 0,
        end: 10000,
        fromPos: {
            x: 0,
            y: 0,
            z: 100
        },
        toPos: {
            x: 0,
            y: 0,
            z: 100
        }
    }, {
        start: 10000,
        end: 12000,
        fromPos: {
            x: 0,
            y: 0,
            z: 100
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
    animations: [{
        start: 0,
        end: 10250,
        fromPos: {
            x: 0,
            y: 0,
            z: 100
        },
        toPos: {
            x: 0,
            y: 0,
            z: 100
        }
    }, {
        start: 10250,
        end: 12250,
        fromPos: {
            x: 0,
            y: 0,
            z: 100
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ],
    offset: new THREE.Vector3(23.1, 5, 0)
}, {
    name: 'chimney'
}, {
    name: 'cube0'
}, {
    name: 'cube1',
    animations: [{
        start: 0,
        end: 14250,
        fromPos: {
            x: 0,
            y: 100,
            z: 0
        },
        toPos: {
            x: 0,
            y: 100,
            z: 0
        }
    }, {
        start: 14250,
        end: 16250,
        fromPos: {
            x: 0,
            y: 100,
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
    animations: [{
        start: 0,
        end: 14000,
        fromPos: {
            x: 0,
            y: 100,
            z: 0
        },
        toPos: {
            x: 0,
            y: 100,
            z: 0
        }
    }, {
        start: 14000,
        end: 16000,
        fromPos: {
            x: 0,
            y: 100,
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
    animations: [{
        start: 0,
        end: 13750,
        fromPos: {
            x: 0,
            y: 100,
            z: 0
        },
        toPos: {
            x: 0,
            y: 100,
            z: 0
        }
    }, {
        start: 13750,
        end: 15750,
        fromPos: {
            x: 0,
            y: 100,
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
    animations: [{
        start: 0,
        end: 1000,
        fromPos: {
            x: 0,
            y: 100,
            z: 0
        },
        toPos: {
            x: 0,
            y: 100,
            z: 0
        }
    }, {
        start: 1000,
        end: 3000,
        fromPos: {
            x: 0,
            y: 100,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ]
}, {
    name: 'front_bullet'
}, {
    name: 'front_plate'
}, {
    name: 'hook0',
    animations: [{
        start: 0,
        end: 1500,
        fromPos: {
            x: 0,
            y: 100,
            z: 0
        },
        toPos: {
            x: 0,
            y: 100,
            z: 0
        }
    }, {
        start: 1500,
        end: 3500,
        fromPos: {
            x: 0,
            y: 100,
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
    animations: [{
        start: 0,
        end: 2500,
        fromPos: {
            x: 0,
            y: 100,
            z: 0
        },
        toPos: {
            x: 0,
            y: 100,
            z: 0
        }
    }, {
        start: 2500,
        end: 4500,
        fromPos: {
            x: 0,
            y: 100,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ]
}, {
    name: 'lower_plate'
}, {
    name: 'middle_body',
    animations: [{
        start: 0,
        end: 2000,
        fromPos: {
            x: 0,
            y: 100,
            z: 0
        },
        toPos: {
            x: 0,
            y: 100,
            z: 0
        }
    }, {
        start: 2000,
        end: 4000,
        fromPos: {
            x: 0,
            y: 100,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ]
}, {
    name: 'middle_plate'
}, {
    name: 'pole0',
    animations: [{
        start: 0,
        end: 13250,
        fromPos: {
            x: 0,
            y: 100,
            z: 0
        },
        toPos: {
            x: 0,
            y: 100,
            z: 0
        }
    }, {
        start: 13250,
        end: 15250,
        fromPos: {
            x: 0,
            y: 100,
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
    animations: [{
        start: 0,
        end: 13000,
        fromPos: {
            x: 0,
            y: 100,
            z: 0
        },
        toPos: {
            x: 0,
            y: 100,
            z: 0
        }
    }, {
        start: 13000,
        end: 15000,
        fromPos: {
            x: 0,
            y: 100,
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
    animations: [{
        start: 0,
        end: 12750,
        fromPos: {
            x: 0,
            y: 100,
            z: 0
        },
        toPos: {
            x: 0,
            y: 100,
            z: 0
        }
    }, {
        start: 12750,
        end: 14750,
        fromPos: {
            x: 0,
            y: 100,
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
    animations: [{
        start: 0,
        end: 12500,
        fromPos: {
            x: 0,
            y: 100,
            z: 0
        },
        toPos: {
            x: 0,
            y: 100,
            z: 0
        }
    }, {
        start: 12500,
        end: 14500,
        fromPos: {
            x: 0,
            y: 100,
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
    animations: [{
        start: 0,
        end: 12250,
        fromPos: {
            x: 0,
            y: 100,
            z: 0
        },
        toPos: {
            x: 0,
            y: 100,
            z: 0
        }
    }, {
        start: 12250,
        end: 14250,
        fromPos: {
            x: 0,
            y: 100,
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
    animations: [{
        start: 0,
        end: 12000,
        fromPos: {
            x: 0,
            y: 100,
            z: 0
        },
        toPos: {
            x: 0,
            y: 100,
            z: 0
        }
    }, {
        start: 12000,
        end: 14000,
        fromPos: {
            x: 0,
            y: 100,
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
    animations: [{
        start: 0,
        end: 3000,
        fromPos: {
            x: 0,
            y: 100,
            z: 0
        },
        toPos: {
            x: 0,
            y: 100,
            z: 0
        }
    }, {
        start: 3000,
        end: 5000,
        fromPos: {
            x: 0,
            y: 100,
            z: 0
        },
        toPos: {
            x: 0,
            y: 0,
            z: 0
        }
    }, ]
}, {
    name: 'roof1'
}, {
    name: 'roof2'
}, {
    name: 'roof3'
}, {
    name: 'upper_plate'
}];
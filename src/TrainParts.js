var trainParts = [ {
	name : 'front_left_wheel0',
	loaded : false,
	type : 'wheel',
	offset : new THREE.Vector3(-19.15, 5, 0),
	activeAnimation : -1
},
	{
		name : 'front_left_wheel1',
		loaded : false,
		type : 'wheel',
		activeAnimation : 0,
		animations : [ {
			start : 0,
			end : 4000,
			fromPos : {
				x : 0,
				y : 0,
				z : -50
			},
			toPos : {
				x : 0,
				y : 0,
				z : -50
			}
		},
			{
				start : 4000,
				end : 6000,
				fromPos : {
					x : 0,
					y : 0,
					z : -50
				},
				toPos : {
					x : 0,
					y : 0,
					z : 0
				}
			},
		],
		offset : new THREE.Vector3(-12.7, 5, 0)
	},
	{
		name : 'front_right_wheel0',
		loaded : false,
		type : 'wheel',
		activeAnimation : -1,
		offset : new THREE.Vector3(-19.15, 5, 0)
	},
	{
		name : 'front_right_wheel1',
		loaded : false,
		type : 'wheel',
		activeAnimation : -1,
		offset : new THREE.Vector3(-12.7, 5, 0)
	},
	{
		name : 'middle_left_wheel0',
		loaded : false,
		type : 'wheel',
		activeAnimation : -1,
		offset : new THREE.Vector3(-1.1, 5, 0)
	},
	{
		name : 'middle_left_wheel1',
		loaded : false,
		type : 'wheel',
		activeAnimation : -1,
		offset : new THREE.Vector3(5.4, 5, 0)
	},
	{
		name : 'middle_right_wheel0',
		loaded : false,
		type : 'wheel',
		activeAnimation : -1,
		offset : new THREE.Vector3(-1.1, 5, 0)
	},
	{
		name : 'middle_right_wheel1',
		loaded : false,
		type : 'wheel',
		activeAnimation : -1,
		offset : new THREE.Vector3(5.4, 5, 0)
	},
	{
		name : 'rear_left_wheel0',
		loaded : false,
		type : 'wheel',
		activeAnimation : -1,
		offset : new THREE.Vector3(16.6, 5, 0)
	},
	{
		loaded : false,
		name : 'rear_left_wheel1',
		type : 'wheel',
		activeAnimation : -1,
		offset : new THREE.Vector3(23.1, 5, 0)
	},
	{
		loaded : false,
		name : 'rear_right_wheel0',
		type : 'wheel',
		activeAnimation : -1,
		offset : new THREE.Vector3(16.6, 5, 0)
	},
	{
		loaded : false,
		name : 'rear_right_wheel1',
		type : 'wheel',
		activeAnimation : -1,
		offset : new THREE.Vector3(23.1, 5, 0)
	},
	{
		loaded : false,
		activeAnimation : -1,
		offset : new THREE.Vector3(0, 0, 0),
		name : 'chimney'
	},
	{
		loaded : false,
		activeAnimation : -1,
		offset : new THREE.Vector3(0, 0, 0),
		name : 'cube0'
	},
	{
		loaded : false,
		activeAnimation : -1,
		offset : new THREE.Vector3(0, 0, 0),
		name : 'cube1'
	},
	{
		loaded : false,
		activeAnimation : -1,
		offset : new THREE.Vector3(0, 0, 0),
		name : 'cube2'
	},
	{
		loaded : false,
		activeAnimation : -1,
		offset : new THREE.Vector3(0, 0, 0),
		name : 'cube3'
	},
	{
		name : 'front_body',
		loaded : false,
		activeAnimation : 0,
		offset : new THREE.Vector3(0, 0, 0),
		animations : [ {
			start : 0,
			end : 1000,
			fromPos : {
				x : 0,
				y : 50,
				z : 0
			},
			toPos : {
				x : 0,
				y : 50,
				z : 0
			}
		},
			{
				start : 1000,
				end : 3000,
				fromPos : {
					x : 0,
					y : 50,
					z : 0
				},
				toPos : {
					x : 0,
					y : 0,
					z : 0
				}
			},
		]
	},
	{
		loaded : false,
		activeAnimation : -1,
		offset : new THREE.Vector3(0, 0, 0),
		name : 'front_bullet'
	},
	{
		loaded : false,
		activeAnimation : -1,
		offset : new THREE.Vector3(0, 0, 0),
		name : 'front_plate'
	},
	{
		name : 'hook0',
		offset : new THREE.Vector3(0, 0, 0),
		loaded : false,
		activeAnimation : 0,
		animations : [
          {
			start : 0,
			end : 1500,
			fromPos : {
				x : 0,
				y : 50,
				z : 0
			},
			toPos : {
				x : 0,
				y : 50,
				z : 0
			}
		},
			{
				start : 1500,
				end : 3500,
				fromPos : {
					x : 0,
					y : 50,
					z : 0
				},
				toPos : {
					x : 0,
					y : 0,
					z : 0
				}
			},
		]
	},
	{
		name : 'hook1',
		loaded : false,
		offset : new THREE.Vector3(0, 0, 0),
		activeAnimation : 0,
		animations : [
		              {
			start : 0,
			end : 2500,
			fromPos : {
				x : 0,
				y : 50,
				z : 0
			},
			toPos : {
				x : 0,
				y : 50,
				z : 0
			}
		},
			{
				start : 2500,
				end : 4500,
				fromPos : {
					x : 0,
					y : 50,
					z : 0
				},
				toPos : {
					x : 0,
					y : 0,
					z : 0
				}
			},
		]
	},
	{
		loaded : false,
		activeAnimation : -1,
		offset : new THREE.Vector3(0, 0, 0),
		name : 'lower_plate'
	},
	{
		loaded : false,
		name : 'middle_body',
		offset : new THREE.Vector3(0, 0, 0),
		activeAnimation : 0,
		animations : [ {
			start : 0,
			end : 2000,
			fromPos : {
				x : 0,
				y : 50,
				z : 0
			},
			toPos : {
				x : 0,
				y : 50,
				z : 0
			}
		},
			{
				start : 2000,
				end : 4000,
				fromPos : {
					x : 0,
					y : 50,
					z : 0
				},
				toPos : {
					x : 0,
					y : 0,
					z : 0
				}
			},
		]
	},
	{
		loaded : false,
		activeAnimation : -1,
		offset : new THREE.Vector3(0, 0, 0),
		name : 'middle_plate'
	},
	{
		loaded : false,
		offset : new THREE.Vector3(0, 0, 0),
		activeAnimation : -1,
		name : 'pole0'
	},
	{
		loaded : false,
		offset : new THREE.Vector3(0, 0, 0),
		activeAnimation : -1,
		name : 'pole1'
	},
	{
		loaded : false,
		activeAnimation : -1,
		offset : new THREE.Vector3(0, 0, 0),
		name : 'pole2'
	},
	{
		loaded : false,
		activeAnimation : -1,
		offset : new THREE.Vector3(0, 0, 0),
		name : 'pole3'
	},
	{
		loaded : false,
		offset : new THREE.Vector3(0, 0, 0),
		activeAnimation : -1,
		name : 'pole4'
	},
	{
		loaded : false,
		offset : new THREE.Vector3(0, 0, 0),
		activeAnimation : -1,
		name : 'pole5'
	},
	{
		loaded : false,
		activeAnimation : -1,
		offset : new THREE.Vector3(0, 0, 0),
		name : 'rear_body',
		activeAnimation : 0,
		animations : [ {
			start : 0,
			end : 3000,
			fromPos : {
				x : 0,
				y : 50,
				z : 0
			},
			toPos : {
				x : 0,
				y : 50,
				z : 0
			}
		},
			{
				start : 3000,
				end : 5000,
				fromPos : {
					x : 0,
					y : 50,
					z : 0
				},
				toPos : {
					x : 0,
					y : 0,
					z : 0
				}
			},
		]
	},
	{
		loaded : false,
		activeAnimation : -1,
		offset : new THREE.Vector3(0, 0, 0),
		name : 'roof1'
	},
	{
		loaded : false,
		activeAnimation : -1,
		offset : new THREE.Vector3(0, 0, 0),
		name : 'roof2'
	},
	{
		loaded : false,
		offset : new THREE.Vector3(0, 0, 0),
		activeAnimation : -1,
		name : 'roof3'
	},
	{
		loaded : false,
		offset : new THREE.Vector3(0, 0, 0),
		activeAnimation : -1,
		name : 'upper_plate'
	} ];
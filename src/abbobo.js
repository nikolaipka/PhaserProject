var Abbo = (function(){
	function Abbo (game, x, y) {
		Phaser.Sprite.call(this, game, x, y,'abbo_sheet');	
		
		  this.width = 34;
		  this.health = 50;
		  this.maxHealth = 100;
		  this.game.physics.arcade.enable(this);
		  this.anchor.setTo(0.5, 1);
		  //this.movementAnimationRunning = false;
		  this.movementType = null;
		  this.minMovementDistanceX = null;
		  this.maxMovementDistanceY = null;
		  this.movementSpeed = null;
		  this.moveRightNextTick = false;
		  this.moveDownNextTick = false;
		  this.movementTween = null;
		  this.isAggro = false; //e.g. if a player is in range
		  this.aggroRange = null;
		  this.healthBarShape = null;
		  this.isEnemy = null;
		  this.givesXP = null;
		  this.timer = null;
		  this.lastMoveToX = null;
		  this.lastMoveToY = null;
		  this.lastRecalc = null; //last time the movement was recalculated
		  this.secondsAfterRecalMoveTarget = 1;
		  this.randomSecondsBeforeRecalcMovement = 0.8;
		  this.minimumSecondsBeforeRecalcMovement = 1.8;
		  this.randomTimeNextDirectionChange = 0;
		
		
		 game.physics.arcade.enable(this);
		 this.abboDeltaVelocity = 0.3;
		 this.anchor.setTo(0.5, 1);
		//this.scale.x = 1;
		
		this.game.add.existing(this);
		
		//define Abbobo's animations
		this.animations.add('idle', Phaser.Animation.generateFrameNames('idle/', 0, 1, '', 1), 2, true);
		this.animations.add('walk', Phaser.Animation.generateFrameNames('walk/', 0, 4, '', 1), 5, true);
		this.animations.add('hit', Phaser.Animation.generateFrameNames('hit/', 0, 1, '', 1), 2, true);
		this.animations.add('gethit', Phaser.Animation.generateFrameNames('getHit/', 0, 3, '', 1), 4, true);
		this.animations.add('die', Phaser.Animation.generateFrameNames('die/', 0, 0, '', 1), 1, true);
		
	}
	Abbo.prototype = Object.create(Phaser.Sprite.prototype);
	Abbo.prototype.constructor = Abbo;
	
	Abbo.prototype.drawHealthBar = function (color) {
		
	   if(!color){
	     color = 0xFF0000;
	   }
	   if(this.healthBarShape || this.health <= 0) {
	     this.healthBarShape.destroy();
	   }
	   var healthBarShapeWidth = this.health * this.width / this.maxHealth;
	   this.healthBarShape = this.game.add.graphics(0, 0);  //init rect
	
	   //shape.lineStyle(2, 0x0000FF, 1);
	   this.healthBarShape.beginFill(color, 1);
	   this.healthBarShape.drawRect(this.x - healthBarShapeWidth / 2, this.y - this.height - 10, healthBarShapeWidth, 6); // (x, y, w, h)
	 };
	
	Abbo.prototype.update = function() {	
		
		var self = this;
		/*
		self.scale.x = 1;
		self.animations.play('idle');
		*/
		self.animations.play('hit');
		 if(self.x <= player.x) {
			 self.scale.x = 1;
			 self.x += self.abboDeltaVelocity;
			 	if(self.y <= player.y) {
			 		self.y += self.abboDeltaVelocity;
			 	}
			 	self.y -= self.abboDeltaVelocity;
			 	
			 
		 } else {
			 self.scale.x = -1;
			 self.x -= self.abboDeltaVelocity;
			 if(self.y >= player.y) {
			 		self.y -= self.abboDeltaVelocity;
			 	}
			 	self.y += self.abboDeltaVelocity;
		 }
		 
	 
		self.drawHealthBar();
		self.body.collideWorldBounds = true;
		
	}
	return Abbo;
})();
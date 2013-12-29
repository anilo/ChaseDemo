#pragma strict

// The walking speed towards the player     
public var patrolSpeed : float = 6;        

// How slowly to turn
public var dampingLook = 4; 

// declare a public variable for the player transform, so that it can assigned from the inspector
public var playerTransform : Transform;

// this defines when to stop chasing the player
public var MaxChaseDistance:float = 25f; 

// this defines when to stop in front of the player
public var StopChaseDistance:float = 3f; 


private var character : CharacterController;
 
function Start(){
 
    character = GetComponent(CharacterController);
}
 
function Update(){
 
    chase();

}
 
function chase(){
 
    var playerPosition : Vector3 = playerTransform.position;
        
    // Keep waypoint at character's height
    playerPosition.y = transform.position.y; 
        
    // Get the direction we need to move to
    // reach the next waypoint
    var moveDirection : Vector3 = playerPosition - transform.position;
 

    if(moveDirection.magnitude < StopChaseDistance)
    {
        Debug.Log("Player is close to the enemy, we can stop now");
	}
	else
	{
	    if (moveDirection.magnitude < MaxChaseDistance)
	    {
	    																	
	   	    Debug.Log("Player is still within chasing distance - keep running after it");
	       // This code gets called every time update is called
	       // while the enemy if moving towards the player.
	       // so it gets called 100's of times in a few seconds  

	       // Now we need to do two things
	       // 1) Start rotating in the desired direction
	       // 2) Start moving in the desired direction 
       
	       // 1) Let's calculate  desired rotation by looking at playerposition
	       // and comparing with current position
	       var desiredRotation = Quaternion.LookRotation(playerPosition - transform.position);
       
	       // A slerp function allow us to slowly start rotating 
	       // towards our next waypoint 
	       transform.rotation = Quaternion.Slerp(transform.rotation, desiredRotation, 
	               Time.deltaTime * dampingLook);
                
  	     // 2) Now also let's start moving towards our waypoint
 	      character.Move(moveDirection.normalized * patrolSpeed * Time.deltaTime);
 	    }
 	    else
 	    {
 	    	 Debug.Log("Player is too far away - stop chasing");
 	    }
    }  
}
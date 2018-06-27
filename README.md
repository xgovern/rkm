# RKM (Rane-Kim-Matsumoto) Key Recovery Mechanism

[recoverkey.io](https://recoverkey.io "Potion: Recover Key")
  
Personalized recovery scheme for private keys & un-resettable passwords with custom questionnaires  
  
## Personalization Schematics
  
![RKM Schematics](https://xgov.s3-accelerate.amazonaws.com/potion/rkm_scheme5.png "")
  
## Usage Documentation
  
### Generating Strongly Encrypted Questionnaire

rkm.`digest`(  
&nbsp; &nbsp; &nbsp; &nbsp; {  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; __private_key__:(str), __password__:(str),  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; __questions__:(array(str)), __answers__:(array(str)),  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; *false_positive_rate*:(str,'33%'), *batch_size*:(+int,40000),  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; *map_byte*:(+int:(2~8)), *salt_length*:(+int:(16+)),  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; *minimum_iteration_password*:(+int,1),  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; *minimum_iteration_mark*:(+int,1),  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; *minimum_iteration_answer*:(+int,1)  
&nbsp; &nbsp; &nbsp; &nbsp; },  
&nbsp; &nbsp; &nbsp; &nbsp; {  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; __callback__:(func),  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; *onprogress*:(func)  
&nbsp; &nbsp; &nbsp; &nbsp; }  
);

The function resolves to an output which is an encrypted questionnaire.
The encrypted questionnaire does not store the answers inside,
and thus is a much safer way to store an recovery option at-rest.  
  
1) This is certainly better than 16~32 random recovery phrases
that one has to write down which is vulnerable to location/physical attack)  
  
2) This is also superior to user-chosen seed words which is notoriously easier to brute-force.
  
  
```javascript
//
//	private_key accepted format: base58 (bitcoin) && base62 (xgov) & hex (ethereum)
//	Minimum 1 Q&A required; maximum 16 pairs
//	questions, answers, passwords all support Unicode, foreign characters
// 	default answer filter: toLowerCase then remove special chars and white spaces
// 	
//	See example below for usage:
//
rkm.digest({
		private_key:'SJSvdelNkuc9aKNQE1u8B1t3iLwHqicabPCzXbu8aBr',
		password:'some_very_berry_difficult_password',
		questions:[
			"Custom Question 1",
			"Custom Question 2",
			"Custom Question 3",
			"Custom Question 4",
			"Custom Question 5"
		],
		answers:[
			"Answer 1",
			"Answer 2",
			"Answer 3",
			"Answer 4",
			"Answer 5"
		],
	},{
	callback:function(e,data){
		if(e) return; //Error case;
		var encrypted_questionnaire_base64 = data;
		//wrapping scheme: JSON --> gzip --> nacl-secretbox --> base64
		//To decrypt, base64_decode --> nacl-secretbox-open --> gzip.undo --> JSON.parse
		
	},
	onprogress:function(data){
		//Progress event types
		//data.type == 'thread_spawn'
		//data.type == 'password_iteration'
		//data.type == 'password_iteration_complete'
		//data.type == 'mask_iteration'
		//data.type == 'mask_iteration_complete'
		//data.type == 'answer_iteration'
		//data.type == 'answer_iteration_partial_complete'
		//data.type == 'answer_iteration_all_complete'
		
		//data.count is the iteration counter so far
		//data.arg has the input parameters of each interation call
	}
});

```  
    
#### LICENSE (Proprietary; For Audit-only Code Disclosure)
© 2018 Potion, all rights reserved.  
Unauthorized copying of this file, via any medium is strictly prohibited.  
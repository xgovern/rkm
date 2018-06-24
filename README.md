# RKM (Rane-Kim-Matsumoto) Key Recovery Mechanism

[recoverkey.io](https://recoverkey.io "Potion: Recover Key")

Personalized-questionnaire recovery scheme for private key & long passwords.
  
## API Usage & Documentation

### Digesting Questionnaire & Answer Sheet

rkm.`digest`(  
&nbsp; &nbsp; &nbsp; &nbsp; {__private_key__:(str), __password__:(str,''), __questions__:(array(str)), __answers__:(array(str)), *async\_interval*:(+int,300)},  
&nbsp; &nbsp; &nbsp; &nbsp; {__callback__:(func), *onprogress*(func)}  
);
  
```javascript
//
// 
//	
//
rkm.digest({
	domain:'', group:''
	},{
	callback:function(e,data){
		if(e) return; //Error case;
	},
	onprogress:function(data){
		
	}
});

```  
    
#### LICENSE (Proprietary; For Audit-only Code Disclosure)
© 2018 Potion, all rights reserved.  
Unauthorized copying of this file, via any medium is strictly prohibited.  
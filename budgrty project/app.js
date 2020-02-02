//budget controller
var budgetcontroller=(function(){
	//constructor function for different user inputs
	var expense=function(id,description,value)
	{
		this.id=id;
		this.description=description;
		this.value=value;
	}
	var income=function(id,description,value)
	{
		this.id=id;
		this.description=description;
		this.value=value;
	}

	 var calculatetotal=function(){
	 	var sum=0;
	 	data.allitems[type].forEach(function(cur){
	 		sum=sum+cur.value
	 	});
	 };
	 data.total[type]=sum;
     //Data structures for store user values
	var data={
		allitems:{
			exp:[],
			inc:[]
		},
		total:{
			exp:0,
			inc:0
		},
		budget:0;
		percentage=-1;
	}

	return{
		additem:function(type,desc,val){
		var newitem,id;

		if(data.allitems[type].length>0)
		{
			id=data.allitems[type][data.allitems[type].length-1].id+1;
		}
		else
		{
			id=0;
		}
		if(type=="exp")
		{
			newitem=new expense(id,desc,val)
		}else if(type=="inc")
		{
			newitem=new income(id,desc,val)
		}

		data.allitems[type].push(newitem);
		return newitem;
	},

	calculatebudget=function(){
		calculatebudget('exp');
		calculatebudget('inc');
        data.budget=data.total.inc-data.total.exp;

	}
	getbudget=function(){
		return{
			budget=data.budget;
			totalinc=data.total.inc;
			totalexp=data.total.exp;
		}
	}

	  testing:function(){
         console.log(data)
	}
	
})();


//ui controller
var uicontroller=(function(){
	var domstring={
		inputtype:".add__type",
		inputdescription:".add__description",
		inputvalue:".add__value",
		inputbutton:".add__btn",
		incomecontainer:".income__list",
		expensecontainer:".expenses__list",
	}
	return {
		getinput:function(){
			return {
			type: document.querySelector(domstring.inputtype).value,
			description: document.querySelector(domstring.inputdescription).value,
			value: parseFloat(document.querySelector(domstring.inputvalue).value)
			
			};
			
		},

		addlistitem:function(obj,type){
			var html,newhtml;
               
              if(type==="inc"){
              	element=domstring.incomecontainer;
              	html='<div class="item clearfix" id="income-%id%"> <div 
			class="item__description">%description%</div><div class="right clearfix"> <div 
			class="item__value">%value%</div><div class="item__delete"> <button 
			class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div> 
			</div>';
              } else if(type=="exp")
              {
				element=domstring.expensecontainer;
				html='<div class="item clearfix" id="expense-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>';
			 }
			 newhtml=html.replace("%d",obj.id);
			 newhtml=html.replace("%description",obj.description);
			 newhtml=html.replace("%value",obj.value);
			 document.querySelector(element).insertAdjacentHtml('beforeend',newhtml)
		},

		getdomstring:function(){
			return domstring;
		}
			
	}

})();

  
var controller=(function(budgetctrl,uictrl){
	var setupeventlistener=function(){
	    var dom=uictrl.getdomstring();
	    document.querySelector(dom.inputbutton).addEventListener("click",ctrladditem);
	    document.addEventListener("keypress",function(event){
		 if(event.keycode===13 || event.which===13){
			ctrladditem();
		}
	});
	}

	var updatebudget = function(){
             budgetcontroller.calculatebudget();
             var budget=budgetcontroller.getbudget();
             console.log(budget);
	}

	
 	var ctrladditem=function(){
 		var input,newitem
		input=uictrl.getinput();
		newitem=budgetctrl.additem(input.type,input.description,input.value)

		uictrl.addlistitem(newitem,input.type)
	};
	return {
		init:function(){
			console.log("Application has started")
			setupeventlistener();
		}
	}
})(budgetcontroller,uicontroller);

controller.init();
	

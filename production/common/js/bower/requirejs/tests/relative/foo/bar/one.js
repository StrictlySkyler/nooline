define("foo/bar/one",["require",".","./two","../three","text!./message.txt"],function(e,a,n,t,m){return{name:"one",barName:a.name,twoName:n.name,threeName:t.name,message:m}});
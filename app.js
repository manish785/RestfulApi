const Joi=require('joi'); //class in javascript should be in uppercase.
const express=require('express');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.urlencoded({ extended: true}));

const port=process.env.PORT || 3000;


const courses=[
    {id: 1, name:'manish'},
    {id: 2, name:'rohit'},
    {id: 3, name:'punnet'}
]


app.get('/',function(req,res){
    res.send('<h1>Hello World</h1>');
});

app.get('/api/courses',function(req,res){
    res.send(courses);
})

app.get('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=>c.id === parseInt(req.params.id));
    if(!course)
      res.status(404).send('The courses with the given ID not found');
    res.send(course);
})

app.post('/api/courses',(req,res)=>{
    const {error} =validateCourse(req.body);
    if(error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course={
        id:courses.length+1,
        name:req.body
    };
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id',(req,res)=>{
     //look up the course
     //If not existing , return 404
     const course=courses.find(c=>c.id === parseInt(req.params.id));
     if(!course)
       res.status(404).send('The courses with the given ID not found');

     //validate
     //If not valid, return 400 bad request
    
  /*  const result=validateCourse(req.body);
    const {error} =validateCourse(req.body);
    if(error){
        res.status(400).send(result.error.details[0].message);
        return;
    }*/

     //update the course
     //return the updated course
     course.name=req.body;
     res.send(course);

})

function validateCourse(course){
    const schema=Joi.object({
        name:Joi.string().min(3).required()
    })
    return schema.validate(course);
}














app.listen(port,function(err){
    if(err){
        console.log('Error while running the server');
        return;
    }
    console.log(`Server is running fine on port....${port}`);
})
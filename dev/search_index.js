var documenterSearchIndex = {"docs":
[{"location":"SyntaxReference/#","page":"Syntax Reference","title":"Syntax Reference","text":"","category":"page"},{"location":"SyntaxReference/#Main-Macro-and-IO-1","page":"Syntax Reference","title":"Main Macro and IO","text":"","category":"section"},{"location":"SyntaxReference/#","page":"Syntax Reference","title":"Syntax Reference","text":"Modules = [AcuteML]\nPages   = [\"AcuteML.jl\"]","category":"page"},{"location":"SyntaxReference/#EzXML.parsehtml","page":"Syntax Reference","title":"EzXML.parsehtml","text":"parsehtml(htmlstring)\n\nParse htmlstring and create an HTML document.\n\n\n\n\n\n\n\n","category":"function"},{"location":"SyntaxReference/#EzXML.parsexml","page":"Syntax Reference","title":"EzXML.parsexml","text":"parsexml(xmlstring)\n\nParse xmlstring and create an XML document.\n\n\n\n\n\n\n\n","category":"function"},{"location":"SyntaxReference/#EzXML.readhtml","page":"Syntax Reference","title":"EzXML.readhtml","text":"readhtml(filename)\n\nRead filename and create an HTML document.\n\n\n\n\n\nreadhtml(input::IO)\n\nRead input and create an HTML document.\n\n\n\n\n\n\n\n","category":"function"},{"location":"SyntaxReference/#EzXML.readxml","page":"Syntax Reference","title":"EzXML.readxml","text":"readxml(filename)\n\nRead filename and create an XML document.\n\n\n\n\n\nreadxml(input::IO)\n\nRead input and create an XML document.\n\n\n\n\n\n\n\n","category":"function"},{"location":"SyntaxReference/#AcuteML.@aml-Tuple{Any}","page":"Syntax Reference","title":"AcuteML.@aml","text":"@aml typedef\n\nType defnition\n\nUse @aml macro to define a Julia type, and then the package automatically creates a xml or html associated with the defined type.\n\nUse xd\"\" or hd\"\" to define a XML or HTML document:\n\n@aml struct Doc xd\"\"\n  # add fields(elements) here\nend\n\nSpecify the html/xml struct name as a string after the struct name after a space\n\n@aml struct Person \"person\"\n  # add fields(elements) here\nend\n\nSepecify the html/xml field name as a string in front of the field after ,\n\nfield, \"study-field\"\n\nIf the html/xml name is the same as variable/type's name, you can use \"~\" instead\n\nage::UInt, \"~\"\n\nFor already @aml defined types, name should be the same as the defined type root name\n\nuniversity::University, \"university\"\n\nIf the value is going to be an attribute put a before its name\n\nid::Int64, a\"~\"\n\nYou can specify the default value for an argument by using = defVal syntax\n\nGPA::Float64 = 4.5, \"~\"\n\nTo define any restrictions for the values of one field, put the function name that checks a criteria and returns Bool:\n\nGPA::Float64, \"~\", GPAcheck\n\nUse sc\"name\" to define a self-closing (empty) element (e.g. <rest />)\n\n@aml struct rest sc\"~\"\n  # add fields(elements) here\nend\n\nIf you don't specify the type of a variable, it is considered to be string:\n\nfield, \"study-field\"\n\nExample 1 - constructor\n\nusing AcuteML\n\nGPAcheck(x) = x <= 4.5 && x >= 0\n\n@aml struct Person \"person\"\n    age::UInt, \"~\"\n    field, \"study-field\"\n    GPA::Float64 = 4.5, \"~\", GPAcheck\n    courses::Vector{String}, \"taken-courses\"\n    id::Int64, a\"~\"\nend\n\n@aml struct University \"university\"\n    name, a\"university-name\"\n    people::Vector{Person}, \"person\"\nend\n\n@aml struct Doc xd\"\"\n    university::University, \"~\"\nend\n\nP1 = Person(age=24, field=\"Mechanical Engineering\", courses=[\"Artificial Intelligence\", \"Robotics\"], id = 1)\nP2 = Person(age=18, field=\"Computer Engineering\", GPA=4, courses=[\"Julia\"], id = 2)\n\nU = University(name=\"Julia University\", people=[P1, P2])\n\nD = Doc(university = U)\n\n# An example that doesn't meet the critertia function for GPA because GPA is more than 4.5\nP3 = Person(age=99, field=\"Macro Wizard\", GPA=10, courses=[\"Julia Magic\"], id = 3)\njulia>\nGPA doesn't meet criteria function\n\njulia> print(P1.aml)\n<person id=\"1\">\n  <age>24</age>\n  <study-field>Mechanical Engineering</study-field>\n  <GPA>4.5</GPA>\n  <taken-courses>Artificial Intelligence</taken-courses>\n  <taken-courses>Robotics</taken-courses>\n</person>\n\njulia> print(P2.aml)\n<person id=\"2\">\n  <age>18</age>\n  <study-field>Computer Engineering</study-field>\n  <GPA>4</GPA>\n  <taken-courses>Julia</taken-courses>\n</person>\n\njulia> print(U.aml)\n<university university-name=\"Julia University\">\n  <person id=\"1\">\n    <age>24</age>\n    <study-field>Mechanical Engineering</study-field>\n    <GPA>4.5</GPA>\n    <taken-courses>Artificial Intelligence</taken-courses>\n    <taken-courses>Robotics</taken-courses>\n  </person>\n  <person id=\"2\">\n    <age>18</age>\n    <study-field>Computer Engineering</study-field>\n    <GPA>4</GPA>\n    <taken-courses>Julia</taken-courses>\n  </person>\n</university>\n\njulia> print(D.aml)\n<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\" \"http://www.w3.org/TR/REC-html40/loose.dtd\">\n<university university-name=\"Julia University\">\n  <person id=\"1\">\n    <age>24</age>\n    <study-field>Mechanical Engineering</study-field>\n    <GPA>4.5</GPA>\n    <taken-courses>Artificial Intelligence</taken-courses>\n    <taken-courses>Robotics</taken-courses>\n  </person>\n  <person id=\"2\">\n    <age>18</age>\n    <study-field>Computer Engineering</study-field>\n    <GPA>4</GPA>\n    <taken-courses>Julia</taken-courses>\n  </person>\n</university>\n\n\nExample 2 - extractor\n\nusing AcuteML\n\nxml = parsexml(\"\"\"\n<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\" \"http://www.w3.org/TR/REC-html40/loose.dtd\">\n<university university-name=\"Julia University\">\n  <person id=\"1\">\n    <age>24</age>\n    <study-field>Mechanical Engineering</study-field>\n    <GPA>4.5</GPA>\n    <taken-courses>Artificial Intelligence</taken-courses>\n    <taken-courses>Robotics</taken-courses>\n  </person>\n  <person id=\"2\">\n    <age>18</age>\n    <study-field>Computer Engineering</study-field>\n    <GPA>4</GPA>\n    <taken-courses>Julia</taken-courses>\n  </person>\n</university>\n\"\"\")\n\nGPAcheck(x) = x <= 4.5 && x >= 0\n\n@aml struct Person \"person\"\n    age::UInt, \"age\"\n    field::String, \"study-field\"\n    GPA::Float64 = 4.5, \"GPA\", GPAcheck\n    courses::Vector{String}, \"taken-courses\"\n    id::Int64, a\"id\"\nend\n\n@aml struct University \"university\"\n    name, a\"university-name\"\n    people::Vector{Person}, \"person\"\nend\n\n@aml struct Doc xd\"\"\n    university::University, \"university\"\nend\n\n\n# extract Doc\nD = Doc(xml) # StructName(xml) like Doc(xml) extracts the data and stores them in proper format\n\n# Now you can access all of the data by calling the fieldnames\n\n# extract University\nU = D.university\n\njulia>U.name\n\"Julia University\"\n\n# extract Person\n\nP1 = U.people[1]\n\njulia>P1.age\n24\n\njulia>P1.field\nMechanical Engineering\n\njulia>P1.GPA\n4.5\n\njulia>P1.courses\n[\"Artificial Intelligence\", \"Robotics\"]\n\njulia>P1.id\n1\n\n\n\n\n\n","category":"macro"},{"location":"SyntaxReference/#Templating-1","page":"Syntax Reference","title":"Templating","text":"","category":"section"},{"location":"SyntaxReference/#","page":"Syntax Reference","title":"Syntax Reference","text":"Modules = [AcuteML]\nPages   = [\"templating.jl\"]","category":"page"},{"location":"SyntaxReference/#AcuteML.newTemplate","page":"Syntax Reference","title":"AcuteML.newTemplate","text":"newTemplate(name)\n\nCreate new destination html file as the template\n\nnewTemplate(name, :function)\n\nPrints a function to be used as a template\n\nExamples\n\n# you can create a file and edit the file directly by using\nnewTemplate(\"person\")\n\n## create person function to store out html template\nnewTemplate(\"person\", :function)\n\n\n\n\n\n","category":"function"},{"location":"SyntaxReference/#AcuteML.render2file","page":"Syntax Reference","title":"AcuteML.render2file","text":"render2file(destination, overwrite, var...)\n\nrender variables passed as an input to the destination file.\n\nYou should put var in the destination file/string so var is evaluated there. Pass the variables as keyword arguments with the same name you used in the html string/file. Variables should be string,\n\nIf you want to statically overwrite the file pass true as the 2nd argument to the function. Useful if you don't want a dynamic website.\n\nExamples\n\n# Add the following html code to the generated html file\n#=\n<person id=$(id)>\n  <age>$(age)</age>\n  <study-field>$(field)</study-field>\n  <GPA>$(GPA)</GPA>\n  <taken-courses>$(courses[1])</taken-courses>\n  <taken-courses>$(courses[2])</taken-courses>\n</person>\n=#\n\n# Specify the template (or its path), and also the variables for rendering\nout =render2file(\"person\", false,\n  id = 1,\n  age = 24,\n  field = \"Mechanical Engineering\",\n  GPA = 4.5,\n  courses = [\"Artificial Intelligence\", \"Robotics\"])\n\n# you pass `true` as the 2nd argument to owerwrite person.html statically.\n\n\n\n\n\n\n","category":"function"},{"location":"SyntaxReference/#Backend-utilities-1","page":"Syntax Reference","title":"Backend utilities","text":"","category":"section"},{"location":"SyntaxReference/#","page":"Syntax Reference","title":"Syntax Reference","text":"Modules = [AcuteML]\nPages   = [\"utilities.jl\"]","category":"page"},{"location":"SyntaxReference/#AcuteML.findallcontent-Union{Tuple{T}, Tuple{Type{Array{T,1}},String,Union{Document, Node},Int64}} where T<:String","page":"Syntax Reference","title":"AcuteML.findallcontent","text":"findallcontent(type, string, node)\n\nFinds all the elements with the address of string in the node, and converts the elements to Type object.\n\n\n\n\n\n","category":"method"},{"location":"SyntaxReference/#AcuteML.findalllocal-Tuple{String,Union{Document, Node}}","page":"Syntax Reference","title":"AcuteML.findalllocal","text":"findalllocal(s,node)\n\nfindalllocal with ignoring namespaces. It considers element.name for returning the elements\n\n\n\n\n\n","category":"method"},{"location":"SyntaxReference/#AcuteML.findfirstcontent-Union{Tuple{T}, Tuple{Type{T},String,Union{Document, Node},Int64}} where T<:String","page":"Syntax Reference","title":"AcuteML.findfirstcontent","text":"findfirstcontent(element,node)\nfindfirstcontent(type,element,node)\n\nReturns first element content. It also convert to the desired format by passing type. element is given as string.\n\nfindfirstcontent(\"/instrument-name\",node)\nfindfirstcontent(UInt8,\"/midi-channel\",node)\n\n\n\n\n\n","category":"method"},{"location":"SyntaxReference/#AcuteML.findfirstlocal-Tuple{String,Union{Document, Node}}","page":"Syntax Reference","title":"AcuteML.findfirstlocal","text":"findfirstlocal(s, node)\n\nfindfirst with ignoring namespaces. It considers element.name for returning the elements\n\n\n\n\n\n","category":"method"},{"location":"templating/#Templating-1","page":"Templating","title":"Templating","text":"","category":"section"},{"location":"templating/#","page":"Templating","title":"Templating","text":"AcuteML also provides a templating engine if you want to use templates instead of creating the types.","category":"page"},{"location":"templating/#","page":"Templating","title":"Templating","text":"","category":"page"},{"location":"templating/#Example-3-Template-Rendering-using-Functions-1","page":"Templating","title":"Example 3 - Template Rendering using Functions","text":"","category":"section"},{"location":"templating/#","page":"Templating","title":"Templating","text":"This method only uses functions that return string. You can build your desired string and call the function for rendering.","category":"page"},{"location":"templating/#","page":"Templating","title":"Templating","text":"## create person function to store out html template\nnewTemplate(\"person\", :function)\n\n\nfunction person(;id, age, field, GPA, courses)\n\n  # Build the taken courses section\n  loopOut=\"\"\n  for course in courses\n    loopOut = loopout * \"\"\" <taken-courses>$(course)</taken-courses>   \"\"\"\n  end\n\n  # Append all the sections and variables together\n  out = \"\"\"\n  <person id=$(id)>\n    <age>$(age)</age>\n    <study-field>$(field)</study-field>\n    <GPA>$(GPA)</GPA>\n    $loopout\n  </person>\n  \"\"\"\n\n  return out\nend\n\n# Call the function for rendering\nout = person(\n  id = \"1\",\n  age = \"24\",\n  field = \"Mechanical Engineering\",\n  GPA = \"4.5\",\n  courses = [\"Artificial Intelligence\", \"Robotics\"]\n)\n\nprint(out)\n\n# you can also write the output to a file:\nfile = open(filePath, \"r\"); print(file, out); close(file)","category":"page"},{"location":"templating/#","page":"Templating","title":"Templating","text":"","category":"page"},{"location":"templating/#Example-4-Template-Rendering-using-Files-1","page":"Templating","title":"Example 4 - Template Rendering using Files","text":"","category":"section"},{"location":"templating/#","page":"Templating","title":"Templating","text":"You can render variables into html/xml files. However, you can't have multiline control flow Julia code in this method.","category":"page"},{"location":"templating/#","page":"Templating","title":"Templating","text":"# only to set path to current file\ncd(@__DIR__)\n\n\n\n# you can create a file and edit the file directly by using\nnewTemplate(\"person\")\n\n# Add the following html code to the generated html file\n#=\n<person id=$(id)>\n  <age>$(age)</age>\n  <study-field>$(field)</study-field>\n  <GPA>$(GPA)</GPA>\n  <taken-courses>$(courses[1])</taken-courses>\n  <taken-courses>$(courses[2])</taken-courses>\n</person>\n=#\n\n# Specify the template (or its path), and also the variables for rendering\nout =render2file(\"person\", false,\n  id = 1,\n  age = 24,\n  field = \"Mechanical Engineering\",\n  GPA = 4.5,\n  courses = [\"Artificial Intelligence\", \"Robotics\"])\n\n# you pass `true` as the 2nd argument to owerwrite person.html statically.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"CurrentModule = AcuteML","category":"page"},{"location":"#AcuteML-1","page":"Home","title":"AcuteML","text":"","category":"section"},{"location":"#Acute-Markup-Language-1","page":"Home","title":"Acute Markup Language","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"AcuteML is an Acute Markup Language (AML) for Web/XML development in Julia.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"It automatically creates or extracts HTML/XML files from Julia types!\nIt also has a general templating engine, which can be used for any type of documents.","category":"page"},{"location":"#Installation-1","page":"Home","title":"Installation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Add the package","category":"page"},{"location":"#","page":"Home","title":"Home","text":"]add https://github.com/aminya/AcuteML.jl","category":"page"},{"location":"#Usage-1","page":"Home","title":"Usage","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Use the package:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"using AcuteML","category":"page"},{"location":"#Main-macro-and-I/O-1","page":"Home","title":"Main macro and I/O","text":"","category":"section"},{"location":"#Type-defnition-1","page":"Home","title":"Type defnition","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Use @aml macro to define a Julia type, and then the package automatically creates a xml or html associated with the defined type.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Use xd\"\" or hd\"\" to define a XML or HTML document:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"@aml struct Doc xd\"\"\n  # add fields(elements) here\nend","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Specify the html/xml struct name as a string after the struct name after a space","category":"page"},{"location":"#","page":"Home","title":"Home","text":"@aml struct Person \"person\"\n  # add fields(elements) here\nend","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Sepecify the html/xml field name as a string in front of the field after ,","category":"page"},{"location":"#","page":"Home","title":"Home","text":"field, \"study-field\"","category":"page"},{"location":"#","page":"Home","title":"Home","text":"If the html/xml name is the same as variable/type's name, you can use \"~\" instead","category":"page"},{"location":"#","page":"Home","title":"Home","text":"age::UInt, \"~\"","category":"page"},{"location":"#","page":"Home","title":"Home","text":"For already @aml defined types, name should be the same as the defined type root name","category":"page"},{"location":"#","page":"Home","title":"Home","text":"university::University, \"university\"","category":"page"},{"location":"#","page":"Home","title":"Home","text":"If the value is going to be an attribute put a before its name","category":"page"},{"location":"#","page":"Home","title":"Home","text":"id::Int64, a\"~\"","category":"page"},{"location":"#","page":"Home","title":"Home","text":"You can specify the default value for an argument by using = defVal syntax","category":"page"},{"location":"#","page":"Home","title":"Home","text":"GPA::Float64 = 4.5, \"~\"","category":"page"},{"location":"#","page":"Home","title":"Home","text":"To define any restrictions for the values of one field, put the function name that checks a criteria and returns Bool:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"GPA::Float64, \"~\", GPAcheck","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Use sc\"name\" to define a self-closing (empty) element (e.g. <rest />)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"@aml struct rest sc\"~\"\n  # add fields(elements) here\nend","category":"page"},{"location":"#","page":"Home","title":"Home","text":"If you don't specify the type of a variable, it is considered to be string:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"field, \"study-field\"","category":"page"},{"location":"#","page":"Home","title":"Home","text":"","category":"page"},{"location":"#Example-1-Constructor-1","page":"Home","title":"Example 1 - Constructor","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"using AcuteML\n\nGPAcheck(x) = x <= 4.5 && x >= 0\n\n@aml struct Person \"person\"\n    age::UInt, \"~\"\n    field, \"study-field\"\n    GPA::Float64 = 4.5, \"~\", GPAcheck\n    courses::Vector{String}, \"taken-courses\"\n    id::Int64, a\"~\"\nend\n\n@aml struct University \"university\"\n    name, a\"university-name\"\n    people::Vector{Person}, \"person\"\nend\n\n@aml struct Doc xd\"\"\n    university::University, \"~\"\nend\n\n\nP1 = Person(age=24, field=\"Mechanical Engineering\", courses=[\"Artificial Intelligence\", \"Robotics\"], id = 1)\nP2 = Person(age=18, field=\"Computer Engineering\", GPA=4, courses=[\"Julia\"], id = 2)\n\nU = University(name=\"Julia University\", people=[P1, P2])\n\nD = Doc(university = U)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"# An example that doesn't meet the critertia function for GPA because GPA is more than 4.5\nP3 = Person(age=99, field=\"Macro Wizard\", GPA=10, courses=[\"Julia Magic\"], id = 3)\njulia>\nGPA doesn't meet criteria function","category":"page"},{"location":"#","page":"Home","title":"Home","text":"julia> print(P1.aml)\n<person id=\"1\">\n  <age>24</age>\n  <study-field>Mechanical Engineering</study-field>\n  <GPA>4.5</GPA>\n  <taken-courses>Artificial Intelligence</taken-courses>\n  <taken-courses>Robotics</taken-courses>\n</person>\n\njulia> print(P2.aml)\n<person id=\"2\">\n  <age>18</age>\n  <study-field>Computer Engineering</study-field>\n  <GPA>4</GPA>\n  <taken-courses>Julia</taken-courses>\n</person>\n\njulia> print(U.aml)\n<university university-name=\"Julia University\">\n  <person id=\"1\">\n    <age>24</age>\n    <study-field>Mechanical Engineering</study-field>\n    <GPA>4.5</GPA>\n    <taken-courses>Artificial Intelligence</taken-courses>\n    <taken-courses>Robotics</taken-courses>\n  </person>\n  <person id=\"2\">\n    <age>18</age>\n    <study-field>Computer Engineering</study-field>\n    <GPA>4</GPA>\n    <taken-courses>Julia</taken-courses>\n  </person>\n</university>\n\njulia> print(D.aml)\n<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\" \"http://www.w3.org/TR/REC-html40/loose.dtd\">\n<university university-name=\"Julia University\">\n  <person id=\"1\">\n    <age>24</age>\n    <study-field>Mechanical Engineering</study-field>\n    <GPA>4.5</GPA>\n    <taken-courses>Artificial Intelligence</taken-courses>\n    <taken-courses>Robotics</taken-courses>\n  </person>\n  <person id=\"2\">\n    <age>18</age>\n    <study-field>Computer Engineering</study-field>\n    <GPA>4</GPA>\n    <taken-courses>Julia</taken-courses>\n  </person>\n</university>\n","category":"page"},{"location":"#","page":"Home","title":"Home","text":"","category":"page"},{"location":"#Example-2-Extractor-1","page":"Home","title":"Example 2 - Extractor","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"using AcuteML\n\nxml = parsexml(\"\"\"\n<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\" \"http://www.w3.org/TR/REC-html40/loose.dtd\">\n<university university-name=\"Julia University\">\n  <person id=\"1\">\n    <age>24</age>\n    <study-field>Mechanical Engineering</study-field>\n    <GPA>4.5</GPA>\n    <taken-courses>Artificial Intelligence</taken-courses>\n    <taken-courses>Robotics</taken-courses>\n  </person>\n  <person id=\"2\">\n    <age>18</age>\n    <study-field>Computer Engineering</study-field>\n    <GPA>4</GPA>\n    <taken-courses>Julia</taken-courses>\n  </person>\n</university>\n\"\"\")\n\nGPAcheck(x) = x <= 4.5 && x >= 0\n\n@aml struct Person \"person\"\n    age::UInt, \"age\"\n    field::String, \"study-field\"\n    GPA::Float64 = 4.5, \"GPA\", GPAcheck\n    courses::Vector{String}, \"taken-courses\"\n    id::Int64, a\"id\"\nend\n\n@aml struct University \"university\"\n    name, a\"university-name\"\n    people::Vector{Person}, \"person\"\nend\n\n@aml struct Doc xd\"\"\n    university::University, \"university\"\nend\n\n# extract Doc\nD = Doc(xml) # StructName(xml) like Doc(xml) extracts the data and stores them in proper format\n\n# Now you can access all of the data by calling the fieldnames\n\n# extract University\nU = D.university\n\njulia>U.name\n\"Julia University\"\n\n# extract Person\n\nP1 = U.people[1]\n\njulia>P1.age\n24\n\njulia>P1.field\nMechanical Engineering\n\njulia>P1.GPA\n4.5\n\njulia>P1.courses\n[\"Artificial Intelligence\", \"Robotics\"]\n\njulia>P1.id\n1\n","category":"page"},{"location":"#Example-for-Common-Restriction-functions-1","page":"Home","title":"Example for Common Restriction functions","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Restrictions should be given as a function that returns Bool and the function checks for elements.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"For example, for a vector of strings:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"@aml struct Person \"person\"\n   member::Vector{String}, \"member\", memberCheck\nend","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Value limit check:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"memberCheck(x) = any( x>10 || x<5 )  # in a compact form: x-> any(x>10 || x<5)\n# x is all the values as a vector in this case","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Check of the length of the vector:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"memberCheck(x) = 0 < length(x) && length(x) < 10","category":"page"},{"location":"#","page":"Home","title":"Home","text":"User should know if the vector is going to be 0-element, its type should be union with nothing, i.e., UN{}. This is because of the EzXML implementation of findfirst and findall.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Set of valuse:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"setOfValues = [2,4,10]\nmemberCheck(x) = in.(x, setOfValues)","category":"page"}]
}

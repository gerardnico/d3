var width = 960, height = 960;

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var color = d3.scaleOrdinal(d3.schemeCategory20);

// A function to extract a description from the path
// The second replace do a camelCase
var pathToDesc = function (str) {
    return str.replace(/_/g, " ").replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
        return letter.toUpperCase();
    });
}


var format = d3.format(",d");

var treemap = d3.treemap()
    .size([width, height])
    .round(true)
    .padding(1);

// The stratify object
var stratify = d3.stratify()
    .parentId(function (d) {
        return d.path.substring(0, d.path.lastIndexOf("\\"));
    })
    .id(function (d) {
        return d.path;
    });

var data = d3.csvParse(`path,size
pages,0
pages\\.,67
pages\\about,0
pages\\abstraction,0
pages\\algorithm,17
pages\\android,84
pages\\ant,29
pages\\antlr,17
pages\\apache,5
pages\\apex,78
pages\\application,88
pages\\application_server,0
pages\\application_server\\.,1
pages\\application_server\\tomcat,0
pages\\architecture,12
pages\\automata,6
pages\\backup,4
pages\\bdd,1
pages\\bi,1
pages\\bics,3
pages\\bi_application,0
pages\\bi_application\\.,1
pages\\bi_application\\obia,0
pages\\book,8
pages\\chart,0
pages\\code,0
pages\\code\\.,7
pages\\code\\compiler,26
pages\\code\\design,38
pages\\code\\design_pattern,18
pages\\code\\engine,12
pages\\code\\feature,3
pages\\code\\function,24
pages\\code\\grammar,34
pages\\code\\lang,13
pages\\code\\object,7
pages\\code\\property,4
pages\\code\\quality,5
pages\\code\\shipping,24
pages\\code\\test,11
pages\\code\\type,21
pages\\code\\version,0
pages\\code\\version\\.,13
pages\\code\\version\\git,42
pages\\code\\version\\svn,13
pages\\communication_system,0
pages\\communication_system\\.,1
pages\\communication_system\\dokuwiki,0
pages\\communication_system\\wordpress,2
pages\\company,0
pages\\company\\.,1
pages\\company\\oracle,0
pages\\company\\sas,1
pages\\concurrency,33
pages\\counter,0
pages\\counter\\.,13
pages\\counter\\collector,4
pages\\counter\\monitoring,7
pages\\counter\\performance,6
pages\\counter\\resource,0
pages\\counter\\resource\\.,1
pages\\counter\\resource\\metric,5
pages\\counter\\resource\\system,0
pages\\counter\\resource\\system\\.,4
pages\\counter\\resource\\system\\cpu,8
pages\\dat,0
pages\\dat\\.,2
pages\\data,0
pages\\data\\.,17
pages\\datawarehouse,0
pages\\datawarehouse\\dataquality,0
pages\\data\\analysis,3
pages\\data\\database,15
pages\\data\\modeling,51
pages\\data\\partition,4
pages\\data\\persistence,5
pages\\data\\processing,0
pages\\data\\processing\\.,15
pages\\data\\processing\\batch,4
pages\\data\\processing\\stream,15
pages\\data\\property,11
pages\\data\\quality,15
pages\\data\\sort,9
pages\\data\\type,0
pages\\data\\type\\.,12
pages\\data\\type\\boolean,3
pages\\data\\type\\collection,10
pages\\data\\type\\color,35
pages\\data\\type\\graph,18
pages\\data\\type\\key_value,3
pages\\data\\type\\number,0
pages\\data\\type\\number\\.,24
pages\\data\\type\\number\\bit,9
pages\\data\\type\\number\\collection,0
pages\\data\\type\\number\\collection\\.,4
pages\\data\\type\\number\\collection\\quantile,9
pages\\data\\type\\number\\decimal,3
pages\\data\\type\\number\\function,0
pages\\data\\type\\number\\function\\.,11
pages\\data\\type\\number\\function\\primitive,5
pages\\data\\type\\number\\integer,7
pages\\data\\type\\number\\system,9
pages\\data\\type\\relation,0
pages\\data\\type\\relation\\.,11
pages\\data\\type\\relation\\benchmark,4
pages\\data\\type\\relation\\engine,27
pages\\data\\type\\relation\\index,4
pages\\data\\type\\relation\\modeling,4
pages\\data\\type\\relation\\operator,0
pages\\data\\type\\relation\\operator\\.,2
pages\\data\\type\\relation\\operator\\nested_loop,6
pages\\data\\type\\relation\\sql,36
pages\\data\\type\\relation\\structure,6
pages\\data\\type\\spatial,14
pages\\data\\type\\text,49
pages\\data\\type\\time,0
pages\\data\\type\\time\\.,5
pages\\data\\type\\time\\collection,3
pages\\data\\type\\time\\duration,2
pages\\data\\type\\time\\scalar,13
pages\\data\\type\\time\\serie,18
pages\\data\\type\\tree,33
pages\\data\\viz,48
pages\\data\\warehouse,18
pages\\data_access_tools,0
pages\\data_access_tools\\analytic_applications,0
pages\\data_access_tools\\report_writers,0
pages\\data_mining,324
pages\\data_model,0
pages\\data_storage,63
pages\\dat\\analytic,0
pages\\dat\\analytic\\bo,0
pages\\dat\\analytic\\obiee,0
pages\\dat\\bip,1
pages\\dat\\modeling,0
pages\\dat\\obiee,0
pages\\dat\\obiee\\.,149
pages\\dat\\obiee\\deploy,8
pages\\dat\\obiee\\installation,2
pages\\dat\\obiee\\obips,101
pages\\dat\\obiee\\obis,0
pages\\dat\\obiee\\obis\\.,154
pages\\dat\\obiee\\obisch,2
pages\\dat\\obiee\\obis\\api,10
pages\\dat\\obiee\\obis\\logical_sql,25
pages\\dat\\obiee\\obis\\query_processing,8
pages\\dat\\obiee\\ops,2
pages\\dat\\rw,0
pages\\dat\\rw\\bip,0
pages\\db,0
pages\\db\\.,18
pages\\db\\endeca,72
pages\\db\\excel,32
pages\\db\\hadoop,4
pages\\db\\hana,0
pages\\db\\hana\\.,96
pages\\db\\hana\\memory,11
pages\\db\\hana\\sdi,5
pages\\db\\hive,3
pages\\db\\javadb,10
pages\\db\\mysql,2
pages\\db\\oracle,0
pages\\db\\oracle\\.,485
pages\\db\\oracle\\company,1
pages\\db\\oracle\\partition,21
pages\\db\\oracle\\segment,5
pages\\db\\oracle\\sql,1
pages\\db\\oracle\\statistics,10
pages\\db\\pig,2
pages\\db\\spark,42
pages\\db\\sqlite,9
pages\\db\\sql_server,20
pages\\db\\timesten,83
pages\\development,0
pages\\development_techniques,0
pages\\dit,0
pages\\dit\\.,5
pages\\dit\\cloveretl,11
pages\\dit\\kafka,26
pages\\dit\\odi,66
pages\\dit\\owb,92
pages\\dit\\powercenter,102
pages\\dit\\ssis,16
pages\\docker,41
pages\\dokuwiki,21
pages\\dw,0
pages\\dw\\analytic_function,0
pages\\dw\\etl,0
pages\\dw\\etl\\informatica_powercenter,0
pages\\dw\\etl\\informatica_powercenter\\.,3
pages\\dw\\etl\\informatica_powercenter\\dac,0
pages\\dw\\join,0
pages\\dw\\techniques,0
pages\\dw\\techniques\\modeling,0
pages\\dw\\techniques\\modeling\\star_schema,0
pages\\dw\\testing,0
pages\\ebs,8
pages\\electronic,1
pages\\email,7
pages\\epm,0
pages\\epm\\.,17
pages\\epm\\essbase,151
pages\\epm\\planning,1
pages\\etl,0
pages\\etl\\owb,0
pages\\etl\\owb\\operator,0
pages\\etl\\owb\\operator\\properties,0
pages\\etl\\owb\\scripting,0
pages\\etl\\owb\\techniques,0
pages\\exadata,1
pages\\exalytics,8
pages\\file,0
pages\\file\\.,23
pages\\file\\transfer,0
pages\\file\\transfer\\.,6
pages\\file\\transfer\\ftp,10
pages\\firefox,4
pages\\ga,2
pages\\geometry,18
pages\\glassfish,2
pages\\google,0
pages\\hardware,4
pages\\home,0
pages\\http,33
pages\\hudson,4
pages\\hyperion,0
pages\\ide,0
pages\\ide\\.,6
pages\\ide\\eclipse,25
pages\\ide\\forms,2
pages\\ide\\idea,0
pages\\ide\\idea\\.,17
pages\\ide\\idea\\plugin_dev,31
pages\\ide\\jedit,2
pages\\ide\\notepad,7
pages\\ide\\sqldeveloper,10
pages\\ide\\toad,4
pages\\ide\\vscode,6
pages\\image,4
pages\\inkscape,2
pages\\internet,0
pages\\io,23
pages\\j2ee,0
pages\\jenkins,22
pages\\jmeter,36
pages\\jpa,39
pages\\kerberos,24
pages\\lang,0
pages\\lang\\.,8
pages\\langage,0
pages\\langage\\plsql,0
pages\\langage\\plsql\\sql_dynamic,0
pages\\lang\\bash,0
pages\\lang\\bash\\.,155
pages\\lang\\bash\\edition,7
pages\\lang\\bash\\flow,8
pages\\lang\\bash\\fs,15
pages\\lang\\bash\\process,10
pages\\lang\\beanshell,3
pages\\lang\\dos,71
pages\\lang\\go,45
pages\\lang\\groovy,22
pages\\lang\\java,0
pages\\lang\\java\\.,188
pages\\lang\\javascript,0
pages\\lang\\javascript\\.,48
pages\\lang\\javascript\\browser,8
pages\\lang\\javascript\\es,0
pages\\lang\\javascript\\es\\.,61
pages\\lang\\javascript\\es\\class,2
pages\\lang\\javascript\\es\\module,3
pages\\lang\\javascript\\es\\object,7
pages\\lang\\javascript\\es\\this,3
pages\\lang\\javascript\\node,0
pages\\lang\\javascript\\node\\.,13
pages\\lang\\javascript\\node\\module,8
pages\\lang\\javascript\\react,24
pages\\lang\\javascript\\webpack,6
pages\\lang\\java\\concurrency,29
pages\\lang\\java\\io,14
pages\\lang\\java\\jdbc,23
pages\\lang\\java\\jmx,16
pages\\lang\\java\\jsf,15
pages\\lang\\java\\junit,3
pages\\lang\\java\\time,4
pages\\lang\\java\\xml,0
pages\\lang\\java\\xml\\.,7
pages\\lang\\java\\xml\\jaxb,2
pages\\lang\\java\\xml\\jaxp,7
pages\\lang\\ksh,3
pages\\lang\\php,45
pages\\lang\\plsql,48
pages\\lang\\powershell,3
pages\\lang\\python,85
pages\\lang\\r,162
pages\\lang\\ruby,3
pages\\lang\\scala,24
pages\\lang\\sqlplus,95
pages\\lang\\tcl,14
pages\\lang\\tsql,9
pages\\lexalytics,12
pages\\linear_algebra,60
pages\\linkedin,2
pages\\linux,0
pages\\linux\\.,124
pages\\linux\\init,6
pages\\managment,0
pages\\map,0
pages\\mapviewer,13
pages\\markup,0
pages\\markup\\.,6
pages\\markup\\css,0
pages\\markup\\css\\.,84
pages\\markup\\css\\block,0
pages\\markup\\css\\block\\.,8
pages\\markup\\css\\block\\float,2
pages\\markup\\css\\block\\inline,4
pages\\markup\\css\\box,11
pages\\markup\\css\\flex,2
pages\\markup\\css\\inline,2
pages\\markup\\css\\positioning,13
pages\\markup\\dom,0
pages\\markup\\dom\\.,24
pages\\markup\\dom\\event,10
pages\\markup\\html,132
pages\\markup\\selector,10
pages\\markup\\xml,39
pages\\markup\\xslt,29
pages\\material,0
pages\\mathematics,31
pages\\maven,63
pages\\model,0
pages\\natural_language,0
pages\\natural_language\\.,34
pages\\natural_language\\dutch,2
pages\\natural_language\\english,42
pages\\netbeans,2
pages\\network,56
pages\\nsis,0
pages\\oas,0
pages\\oba,0
pages\\obia,13
pages\\obiee,0
pages\\odbc,0
pages\\odbc\\.,11
pages\\odbc\\unix,10
pages\\odbc\\windows,1
pages\\odm,12
pages\\olap,0
pages\\olap\\.,12
pages\\olap\\dimensional_modeling,17
pages\\oracledatabase,0
pages\\oracle_spatial,10
pages\\oracle_sql_developer_data_modeler,1
pages\\origin,0
pages\\os,0
pages\\os\\.,19
pages\\os\\cpu,16
pages\\os\\gnu,9
pages\\os\\windows,31
pages\\ovm,2
pages\\pdf,3
pages\\playground,1
pages\\plotly,1
pages\\plsql,0
pages\\plsql\\techniques,0
pages\\powerdesigner,4
pages\\presentation,0
pages\\presentation\\.,1
pages\\presentation\\090603_mdm_obi_forum,6
pages\\private,17
pages\\problem,1
pages\\proc_sys_kernel,0
pages\\project_management,2
pages\\protocol,1
pages\\regexp,26
pages\\resume,5
pages\\sa,0
pages\\salesforce,1
pages\\sap,13
pages\\security,0
pages\\security\\.,10
pages\\security\\ldap,18
pages\\soft_skill,81
pages\\soft_skills,1
pages\\spatial,0
pages\\spatial\\mapviewer,4
pages\\sport,39
pages\\sql_loader,8
pages\\ssas,18
pages\\ssh,7
pages\\statistics,19
pages\\system,0
pages\\system\\.,2
pages\\system\\property,2
pages\\techniques,0
pages\\technology,0
pages\\toad,0
pages\\tomcat,2
pages\\tommy,0
pages\\tool,1
pages\\trac,0
pages\\trigonometry,12
pages\\ui,0
pages\\ui\\.,37
pages\\ui\\bootstrap,2
pages\\vagrant,13
pages\\vcs,0
pages\\virtualbox,4
pages\\viz,0
pages\\viz\\.,7
pages\\viz\\bip,25
pages\\viz\\bobj,0
pages\\viz\\bobj\\.,80
pages\\viz\\bobj\\dashboard_and_analytics,2
pages\\viz\\bobj\\installation,2
pages\\viz\\d3,0
pages\\viz\\d3\\.,34
pages\\viz\\d3\\layout,3
pages\\viz\\ggplot,36
pages\\viz\\ssrs,11
pages\\viz\\svg,0
pages\\viz\\svg\\.,17
pages\\viz\\svg\\shape,13
pages\\vlc,1
pages\\vmware,5
pages\\web,43
pages\\weblogic,71
pages\\web_server,0
pages\\web_server\\.,1
pages\\web_server\\oc4j,8
pages\\web_service,7
pages\\wiki,0
pages\\wiki\\.,3
pages\\wiki\\obiee,0
pages\\winscp,4
pages\\wlst,18
`);

var tree = stratify(data)
    .sum(function (d) {
        return +d.size;
    })
    .sort(function (a, b) {
        return b.value - a.value || b.height - a.height;
    });

// tree.eachAfter(function (d) {
//         if (d.value < 30) {
//             // Suppress the node from the parent
//             const index = d.parent.children.indexOf(d);
//             if (index !== -1) {
//                 d.parent.children.splice(index, 1);
//             }
//         }
//     }
// );

treemap(tree);

var cell = svg.selectAll("a")
    .data(tree.leaves())
    .enter()
    .append("a")
    .attr("target", "_blank")
    .attr("xlink:href", function (d) {
        var pagePath = d.data.path;
        pagePath = pagePath.replace("pages\\", "");
        pagePath = pagePath.replace("\\.", "/");
        pagePath = pagePath.replace(/\\/g, "/");
        return "https://gerardnico.com/wiki/" + pagePath;
    })
    .attr("transform", function (d) {
        return "translate(" + d.x0 + "," + d.y0 + ")";
    });

cell.append("rect")
    .attr("id", function (d) {
        return d.id;
    })
    .attr("width", function (d) {
        return d.x1 - d.x0;
    })
    .attr("height", function (d) {
        return d.y1 - d.y0;
    })
    .attr("fill", function (d) {
        var a = d.ancestors();
        return color(a[a.length - 2].id);
    });

cell.append("clipPath")
    .attr("id", function (d) {
        return "clip-" + d.id;
    })
    .append("use")
    .attr("xlink:href", function (d) {
        return "#" + d.id;
    });

var label = cell.append("text")
    .attr("clip-path", function (d) {
        return "url(#clip-" + d.id + ")";
    });

label.append("tspan")
    .attr("x", 4)
    .attr("y", 13)
    .text(function (d) {
        var textToReturn = "";
        var paths = d.data.path.split("\\");
        var length = paths.length;
        const lastPath = paths[length - 1];
        if (length >= 3) {
            if (lastPath != ".") {
                textToReturn = paths[length - 2] + " - " + lastPath;
            } else {
                textToReturn = paths[length - 2];
            }
        } else {
            textToReturn = lastPath;
        }
        return pathToDesc(textToReturn);
    });

label.append("tspan")
    .attr("x", 4)
    .attr("y", 25)
    .text(function (d) {
        return format(d.value);
    });

cell.append("title")
    .text(function (d) {
        return d.id + "\n" + format(d.value);
    });



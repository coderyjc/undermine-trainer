layui.use(['table', 'form','laytpl', 'layer'], function(){
  var table = layui.table;
  var form = layui.form;
  var laytpl = layui.laytpl;
  var layer = layui.layer;
  var $ = layui.$
  
  // 祝福
	table.render({
		elem: '#blessings'
		,url:'./datasource/blessings.json'
		,toolbar: "#blessingToolbar"
		,cols: [[
			{type:'checkbox'}
			,{field: 'pic',width:120,title: '祝福', templet:function(d){
				fileName = d.name.replaceAll('\'s ', '_27s_').replaceAll(' ', '_') + '.png'
				filepath = './imgs/blessings/' + fileName
				return "<img src="+ filepath+" width='45px' height='45px'/>";
			  }}
			,{field:'name', width:180, title: '名称', sort: true}
			,{field:'description', width:200, title: '作用'}
			,{field:'effect-id', title: 'id', width: 300}
			,{field:'level', title:'设置等级', width:210, templet: '#blessingLevel'}
			,{fixed: 'right', title:'操作', width:130, toolbar: '#blessingBar'}
		]]
		,skin: 'line' //表格风格
		,even: true
	});

	//祝福 - 监听工具条
	table.on('tool(blessings)', function(obj){
	  var data = obj.data;
	  if(obj.event === 'blessing-save'){
		// 弹出信息窗口
		level = obj.tr[0].childNodes[5].firstChild.childNodes[1].childNodes[1].childNodes[1].childNodes[1].value
		if(level > 500 || level <= 0){
			layer.alert("数据输入不对，请重新输入！")
			return
		}
		single_item = [{
			"id": data["effect-id"],
			"level": level,
			"duration": -1.0,
			"durationRatio": 0.0,
			"userData": 0,
			"userString": "",
			"sticky": false
		}]
		layer.open({
		  title: '祝福存档信息'
		  ,content: getblessingInfo(single_item)
		}); 
	  }
	});

	//祝福 - 头工具栏事件
	  table.on('toolbar(blessings)', function(obj){
		var checkStatus = table.checkStatus(obj.config.id);
		// 未选判断
		if(checkStatus.data.length < 1){
			layer.msg("请先选择祝福")
			return
		}
		switch(obj.event){
		  case 'getAllblessings':
			var data = checkStatus.data;
			trans = []
			// 获取数据信息
			for(var item in data){
				single_item = {
					"id": data[item]["effect-id"],
					"level": 10,
					"duration": -1.0,
					"durationRatio": 0.0,
					"userData": 0,
					"userString": "",
					"sticky": false
				}
				trans.push(single_item)
			}
			content = getblessingInfo(trans)
			// 信息展示
			layer.open({
			  title: '祝福存档信息'
			  ,content: content
			}); 
		  break;
		  //自定义头工具栏右侧图标 - 提示
		  case 'LAYTABLE_TIPS':
			layer.alert('这是工具栏右侧自定义的一个图标按钮');
		  break;
		};
	  });

	//监听祝福选择操作
	form.on('switch(blessingsSelect)', function(obj){
	  console.log(obj.elem.name)
	});
	
	$("")
	
});


/**
 * 传入物品的item，包括id和等级
 */
function getblessingInfo(items, level = 0){
	rst = ""
	for(i = 0; i < items.length; i++){
		model = "{<br>&nbsp;&nbsp;&nbsp;&nbsp;\"id\": \"" + items[i].id + "\",<br>" +
						"&nbsp;&nbsp;&nbsp;&nbsp;\"level\": "+ items[i].level +",<br>" + 
						"&nbsp;&nbsp;&nbsp;&nbsp;\"duration\": -1.0,<br>" + 
						"&nbsp;&nbsp;&nbsp;&nbsp;\"durationRatio\": 0.0,<br>" + 
						"&nbsp;&nbsp;&nbsp;&nbsp;\"userData\": 0,<br>" + 
						"&nbsp;&nbsp;&nbsp;&nbsp;\"userString\": \"\",<br>" + 
						"&nbsp;&nbsp;&nbsp;&nbsp;\"sticky\": false<br>}"
						
		rst += model
		if(i !== items.length - 1){
			rst += ",<br>"
		}
	}
	
	return rst
}
layui.use(['table', 'form','laytpl', 'layer'], function(){
  var table = layui.table;
  var form = layui.form;
  var laytpl = layui.laytpl;
  var layer = layui.layer;
  
  // 圣物
	table.render({
		elem: '#relics'
		,url:'./datasource/relics.json'
		,toolbar: "#relicToolbar"
		,cols: [[
			{type:'checkbox'}
			,{field: 'pic',width:120,title: '遗物', templet:function(d){
				fileName = d.name.replaceAll('\'s ', '_27s_').replaceAll(' ', '_') + '.png'
				filepath = './imgs/relics/' + fileName
				return "<img src="+ filepath+" width='45px' height='45px'/>";
			  }}
			,{field:'name', width:180, title: '名称', sort: true}
			,{field:'description', width:380, title: '作用'}
			,{field: 'effect-id', title: 'id', width: 300}
			,{fixed: 'right', title:'操作', toolbar: '#relicBar', width:150}
		]]
		,skin: 'line' //表格风格
	});

	//圣物 - 监听工具条
	table.on('tool(relics)', function(obj){
	  var data = obj.data;
	  if(obj.event === 'relic-save'){
		// 弹出信息窗口
		single_item = [{
			"id": data["effect-id"],
			"level": 0,
			"duration": -1.0,
			"durationRatio": 0.0,
			"userData": 0,
			"userString": "",
			"sticky": false
		}]
		layer.open({
		  title: '圣物存档信息'
		  ,content: getRelicInfo(single_item)
		}); 
	  }
	});

	//圣物 - 头工具栏事件
	  table.on('toolbar(relics)', function(obj){
		var checkStatus = table.checkStatus(obj.config.id);
		// 未选判断
		if(checkStatus.data.length < 1){
			layer.msg("请先选择圣物")
			return
		}
		switch(obj.event){
		  case 'getAllRelics':
			var data = checkStatus.data;
			console.log(data)
			trans = []
			// 获取数据信息
			for(var item in data){
				single_item = {
					"id": data[item]["effect-id"],
					"level": 0,
					"duration": -1.0,
					"durationRatio": 0.0,
					"userData": 0,
					"userString": "",
					"sticky": false
				}
				trans.push(single_item)
			}
			content = getRelicInfo(trans)
			// 信息展示
			layer.open({
			  title: '圣物存档信息'
			  ,content: content
			}); 
		  break;
		  //自定义头工具栏右侧图标 - 提示
		  case 'LAYTABLE_TIPS':
			layer.alert('这是工具栏右侧自定义的一个图标按钮');
		  break;
		};
	  });

	//监听遗物选择操作
	form.on('switch(relicsSelect)', function(obj){
	  console.log(obj.elem.name)
	});
});


/**
 * 传入物品的item，包括id和等级
 */
function getRelicInfo(items, level = 0){
	rst = ""
	for(i = 0; i < items.length; i++){
		model = "{<br>&nbsp;&nbsp;&nbsp;&nbsp;\"id\": \"" + items[i].id + "\",<br>" +
						"&nbsp;&nbsp;&nbsp;&nbsp;\"level\": 0,<br>" + 
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
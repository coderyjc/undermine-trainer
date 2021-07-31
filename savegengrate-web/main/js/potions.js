layui.use(['table', 'form','laytpl', 'layer'], function(){
  var table = layui.table;
  var form = layui.form;
  var laytpl = layui.laytpl;
  var layer = layui.layer;
  var $ = layui.$
  
  // 药水
	table.render({
		elem: '#potions'
		,url:'./datasource/potions.json'
		,toolbar: "#potionToolbar"
		,cols: [[
			{type:'checkbox'}
			,{field: 'pic',width:120,title: '药水', templet:function(d){
				fileName = d.name.replaceAll('\'s ', '_27s_').replaceAll(' ', '_') + '.png'
				filepath = './imgs/potions/' + fileName
				return "<img src="+ filepath+" width='45px' height='45px'/>";
			  }}
			,{field:'name', width:180, title: '名称', sort: true}
			,{field:'description', width:400, title: '作用'}
			,{field:'effect-id', title: 'id', width: 300}
			,{fixed: 'right', title:'操作', width:130, toolbar: '#potionBar'}
		]]
		,skin: 'line' //表格风格
		,even: true
	});

	//药水 - 监听工具条
	table.on('tool(potions)', function(obj){
	  var data = obj.data;
	  if(obj.event === 'potion-save'){
		// 弹出信息窗口
		single_item = [{
			"id": data["effect-id"],
			"currentHP": 5
		}]
		layer.open({
		  title: '药水存档信息'
		  ,content: getpotionInfo(single_item)
		}); 
	  }
	});

	//药水 - 头工具栏事件
	  table.on('toolbar(potions)', function(obj){
		var checkStatus = table.checkStatus(obj.config.id);
		// 未选判断
		if(checkStatus.data.length < 1){
			layer.msg("请先选择药水")
			return
		}
		if(checkStatus.data.length > 6){
			layer.msg("药水最多能带6瓶")
			return
		}
		switch(obj.event){
		  case 'getAllPotions':
			var data = checkStatus.data;
			trans = []
			// 获取数据信息
			for(var item in data){
				single_item = {
					"id": data[item]["effect-id"],
					"currentHP": 5
				}
				trans.push(single_item)
			}
			content = getpotionInfo(trans)
			// 信息展示
			layer.open({
			  title: '药水存档信息'
			  ,content: content
			}); 
		  break;
		  //自定义头工具栏右侧图标 - 提示
		  case 'LAYTABLE_TIPS':
			layer.alert('这是工具栏右侧自定义的一个图标按钮');
		  break;
		};
	  });

	//监听药水选择操作
	form.on('switch(potionsSelect)', function(obj){
	  console.log(obj.elem.name)
	});
	
});


/**
 * 传入物品的item，包括id和等级
 */
function getpotionInfo(items, level = 0){
	rst = ""
	for(i = 0; i < items.length; i++){
		model = "{<br>&nbsp;&nbsp;&nbsp;&nbsp;\"id\": \"" + items[i].id + "\",<br>" +
						"&nbsp;&nbsp;&nbsp;&nbsp;\"currentHP\": 5<br>}"
						
		rst += model
		if(i !== items.length - 1){
			rst += ",<br>"
		}
	}
	
	return rst
}

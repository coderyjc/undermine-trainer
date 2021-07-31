layui.use(['table', 'form','laytpl', 'layer'], function(){
  var table = layui.table;
  var form = layui.form;
  var laytpl = layui.laytpl;
  var layer = layui.layer;
  var $ = layui.$
  
  // 伙伴
	table.render({
		elem: '#familiars'
		,url:'./datasource/familiars.json'
		,toolbar: "#familiarToolbar"
		,cols: [[
			{type:'checkbox'}
			,{field: 'pic',width:70,title: '伙伴', templet:function(d){
				fileName = d.name.replaceAll('\'s ', '_27s_').replaceAll(' ', '_') + '.gif'
				filepath = './imgs/familiars/' + fileName
				return "<img src="+ filepath+" width='45px' height='45px'/>";
			  }}
			,{field:'name', width:100, title: '名称', sort: true}
			,{field:'description1', width:260, title: '技能1'}
			,{field:'description2', width:260, title: '技能2'}
			,{field:'description3', width:260, title: '技能3'}
			,{field:'effect-id', title: 'id', width: 300, hide:true}
			,{fixed: 'right', title:'操作', width:130, toolbar: '#familiarBar'}
		]]
		,skin: 'line' //表格风格
		,even: true
	});

	//伙伴 - 监听工具条
	table.on('tool(familiars)', function(obj){
	  var data = obj.data;
	  if(obj.event === 'familiar-save'){
		// 弹出信息窗口
		single_item = [{
			"id": data["effect-id"],
			"currentHP": 5
		}]
		layer.open({
		  title: '伙伴存档信息'
		  ,content: getfamiliarInfo(single_item)
		}); 
	  }
	});

	//伙伴 - 头工具栏事件
	  table.on('toolbar(familiars)', function(obj){
		var checkStatus = table.checkStatus(obj.config.id);
		// 未选判断
		if(checkStatus.data.length < 1){
			layer.msg("请先选择伙伴")
			return
		}
		if(checkStatus.data.length > 2){
			layer.msg("伙伴最多能带2个")
			return
		}
		switch(obj.event){
		  case 'getAllfamiliars':
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
			content = getfamiliarInfo(trans)
			// 信息展示
			layer.open({
			  title: '伙伴存档信息'
			  ,content: content
			}); 
		  break;
		  //自定义头工具栏右侧图标 - 提示
		  case 'LAYTABLE_TIPS':
			layer.alert('这是工具栏右侧自定义的一个图标按钮');
		  break;
		};
	  });

	//监听伙伴选择操作
	form.on('switch(familiarsSelect)', function(obj){
	  console.log(obj.elem.name)
	});
	
});


/**
 * 传入物品的item，包括id和等级
 */
function getfamiliarInfo(items, level = 0){
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


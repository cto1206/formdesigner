define(['models/FieldModel'], function(FieldModel) {
	return describe("测试FieldModel", function() {
		var field = false;

		beforeEach(function() {
			field = new FieldModel();
		});

		afterEach(function() {
			field = false;
		});

		it("默认数据必须是这样:{type: \'text\', required: false}",
			function() {
				expect(field.get('type'))
					.toEqual('text');

				expect(field.isRequired())
					.toEqual(false);
			});

		it("setName()方法需要修改id, 修改后的格式应该是: ${name}_field.",
			function() {
				field.setName('fieldName');

				expect('fieldName').toEqual(
					field.getName() 
				);

				expect('fieldName_field').toEqual(
					field.get('id') 
				);
			});

		it('调用setName()方法会触发change:id change:name事件',
				function() {
					var changedSpy = jasmine.createSpy('changedSpy');
					field.bind('change:id change:name', changedSpy);
					
					field.setName('changed_name');

					expect(changedSpy).toHaveBeenCalled();
				});

		it("使用构造方法创建对象应该覆盖defaults",
			function() {
				
				var textField = new FieldModel({
					id: 'title_field',
					name: 'title'
				});
			
				var type = textField.get('type');
				expect(type).toBeDefined();
				expect(type).toEqual('text');
				
				expect(textField.isRequired()).toEqual(false);
			});

	});
});

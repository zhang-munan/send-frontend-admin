declare namespace Eps {
	interface BaseSysDepartmentEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 部门名称
		 */
		name?: string;

		/**
		 * 创建者ID
		 */
		userId?: number;

		/**
		 * 上级部门ID
		 */
		parentId?: number;

		/**
		 * 排序
		 */
		orderNum?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysLogEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 用户ID
		 */
		userId?: number;

		/**
		 * 行为
		 */
		action?: string;

		/**
		 * ip
		 */
		ip?: string;

		/**
		 * 参数
		 */
		params?: any;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 姓名
		 */
		name?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysMenuEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 父菜单ID
		 */
		parentId?: number;

		/**
		 * 菜单名称
		 */
		name?: string;

		/**
		 * 菜单地址
		 */
		router?: string;

		/**
		 * 权限标识
		 */
		perms?: string;

		/**
		 * 类型 0-目录 1-菜单 2-按钮
		 */
		type?: number;

		/**
		 * 图标
		 */
		icon?: string;

		/**
		 * 排序
		 */
		orderNum?: number;

		/**
		 * 视图地址
		 */
		viewPath?: string;

		/**
		 * 路由缓存
		 */
		keepAlive?: boolean;

		/**
		 * 是否显示
		 */
		isShow?: boolean;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysParamEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 键
		 */
		keyName?: string;

		/**
		 * 名称
		 */
		name?: string;

		/**
		 * 数据
		 */
		data?: string;

		/**
		 * 数据类型 0-字符串 1-富文本 2-文件
		 */
		dataType?: number;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysRoleEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 用户ID
		 */
		userId?: string;

		/**
		 * 名称
		 */
		name?: string;

		/**
		 * 角色标签
		 */
		label?: string;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 数据权限是否关联上下级
		 */
		relevance?: boolean;

		/**
		 * 菜单权限
		 */
		menuIdList?: any;

		/**
		 * 部门权限
		 */
		departmentIdList?: any;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysUserEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 部门ID
		 */
		departmentId?: number;

		/**
		 * 创建者ID
		 */
		userId?: number;

		/**
		 * 姓名
		 */
		name?: string;

		/**
		 * 用户名
		 */
		username?: string;

		/**
		 * 密码
		 */
		password?: string;

		/**
		 * 密码版本, 作用是改完密码，让原来的token失效
		 */
		passwordV?: number;

		/**
		 * 昵称
		 */
		nickName?: string;

		/**
		 * 头像
		 */
		headImg?: string;

		/**
		 * 手机
		 */
		phone?: string;

		/**
		 * 邮箱
		 */
		email?: string;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 状态 0-禁用 1-启用
		 */
		status?: number;

		/**
		 * socketId
		 */
		socketId?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ConversationInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 用户 ID
		 */
		userId?: BigInt;

		/**
		 * 收件人手机号
		 */
		receiverPhone?: string;

		/**
		 * 收件人脱敏号码
		 */
		receiverPhoneMask?: string;

		/**
		 * 最后一条消息摘要
		 */
		lastMsgContent?: string;

		/**
		 * 最后消息时间
		 */
		lastMsgTime?: Date;

		/**
		 * 最后一条是否为回复
		 */
		lastMsgIsReply?: number;

		/**
		 * 未读回复数
		 */
		unreadCount?: number;

		/**
		 * 消息总数
		 */
		msgCount?: number;

		/**
		 * 收件人是否已退订
		 */
		isReceiverUnsubscribed?: number;

		/**
		 * 是否标记重要
		 */
		isMarked?: number;

		/**
		 * 标记类型 important/processed/ended
		 */
		markType?: string;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 昵称
		 */
		userName?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DemoGoodsEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 标题
		 */
		title?: string;

		/**
		 * 价格（分）
		 */
		price?: BigInt;

		/**
		 * 描述
		 */
		description?: string;

		/**
		 * 主图
		 */
		mainImage?: string;

		/**
		 * 分类
		 */
		type?: number;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 示例图
		 */
		exampleImages?: any;

		/**
		 * 库存
		 */
		stock?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 昵称
		 */
		userName?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DictInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 类型ID
		 */
		typeId?: number;

		/**
		 * 名称
		 */
		name?: string;

		/**
		 * 值
		 */
		value?: string;

		/**
		 * 排序
		 */
		orderNum?: number;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 父ID
		 */
		parentId?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DictTypeEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 名称
		 */
		name?: string;

		/**
		 * 标识
		 */
		key?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface FeedbackInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 用户ID
		 */
		userId?: number;

		/**
		 * 反馈类型
		 */
		type?: number;

		/**
		 * 反馈内容
		 */
		content?: string;

		/**
		 * 截图
		 */
		images?: any;

		/**
		 * 联系方式
		 */
		contact?: string;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 管理员回复
		 */
		reply?: string;

		/**
		 * 回复时间
		 */
		replyTime?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface MessageBlacklistEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 执行拉黑的收件用户ID
		 */
		blockerUserId?: number;

		/**
		 * 被拉黑的发送用户ID
		 */
		blockedUserId?: number;

		/**
		 * 发起拉黑的会话ID
		 */
		sourceConversationId?: number;

		/**
		 * 拉黑时已成功送达的消息数
		 */
		deliveredMessageCount?: number;

		/**
		 * 收件端展示用的最近消息摘要
		 */
		lastMessagePreview?: string;

		/**
		 * 拉黑时间
		 */
		blockedAt?: Date;

		/**
		 * 解除拉黑时间
		 */
		unblockedAt?: Date;

		/**
		 * 状态 0已解除 1拉黑中
		 */
		status?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 昵称
		 */
		blockerNickName?: string;

		/**
		 * 手机号
		 */
		blockerPhone?: string;

		/**
		 * 昵称
		 */
		blockedNickName?: string;

		/**
		 * 手机号
		 */
		blockedPhone?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface MessageInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 发送用户ID
		 */
		userId?: BigInt;

		/**
		 * 使用的模板ID
		 */
		templateId?: BigInt;

		/**
		 * 所属对话ID
		 */
		conversationId?: BigInt;

		/**
		 * 收件人手机号（明文）
		 */
		receiverPhone?: string;

		/**
		 * 收件人脱敏号码
		 */
		receiverPhoneMask?: string;

		/**
		 * 消息内容
		 */
		content?: string;

		/**
		 * 消息字数
		 */
		contentLength?: smallint;

		/**
		 * 计费条数
		 */
		smsCount?: number;

		/**
		 * 是否匿名 0实名 1匿名
		 */
		isAnonymous?: number;

		/**
		 * 是否公开到广场 0私密 1公开
		 */
		isPublic?: number;

		/**
		 * 发送者签名
		 */
		senderSignature?: string;

		/**
		 * 1立即发送 2定时发送
		 */
		sendType?: number;

		/**
		 * 定时发送时间
		 */
		scheduledAt?: Date;

		/**
		 * 0待审核 1审核通过 2审核拒绝 3待发送 4发送中 5已送达 6发送失败 7已取消
		 */
		status?: number;

		/**
		 * 0待审核 1通过 2拒绝 3转人工
		 */
		auditStatus?: number;

		/**
		 * 审核备注
		 */
		auditRemark?: string;

		/**
		 * 审核时间
		 */
		auditedAt?: Date;

		/**
		 * 短信平台消息ID
		 */
		smsMsgId?: string;

		/**
		 * 短信通道标识
		 */
		smsChannel?: string;

		/**
		 * 送达时间
		 */
		deliveredAt?: Date;

		/**
		 * 失败原因
		 */
		failReason?: string;

		/**
		 * 重试次数
		 */
		retryCount?: number;

		/**
		 * 扣费金额（分）
		 */
		feeAmount?: BigInt;

		/**
		 * 支付来源 1套餐配额 2余额 3在线支付 4模拟支付
		 */
		payType?: number;

		/**
		 * 是否免费重发
		 */
		isFreeRetry?: number;

		/**
		 * 发送端IP
		 */
		clientIp?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 昵称
		 */
		senderNickName?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface UserBalanceEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 用户ID
		 */
		userId?: BigInt;

		/**
		 * 当前余额（分）
		 */
		balance?: BigInt;

		/**
		 * 剩余消息条数
		 */
		messageQuota?: number;

		/**
		 * 累计充值（分）
		 */
		totalRecharge?: BigInt;

		/**
		 * 累计消费（分）
		 */
		totalConsumed?: BigInt;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 昵称
		 */
		userNickName?: string;

		/**
		 * 手机号
		 */
		userPhone?: string;

		/**
		 * 头像
		 */
		userAvatar?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface OrderInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 用户ID
		 */
		userId?: BigInt;

		/**
		 * 订单编号
		 */
		orderNo?: string;

		/**
		 * 商品ID
		 */
		productId?: BigInt;

		/**
		 * 商品名称
		 */
		productName?: string;

		/**
		 * 数量
		 */
		quantity?: number;

		/**
		 * 商品原价（分）
		 */
		originalPrice?: BigInt;

		/**
		 * 优惠金额（分）
		 */
		discountAmount?: BigInt;

		/**
		 * 实付金额（分）
		 */
		payAmount?: BigInt;

		/**
		 * 支付方式：1微信 2支付宝 3余额 4模拟支付 5套餐余额
		 */
		payMethod?: number;

		/**
		 * 0待支付 1已支付 2已退款 3已关闭
		 */
		status?: number;

		/**
		 * 支付时间
		 */
		payTime?: Date;

		/**
		 * 第三方支付流水号
		 */
		tradeNo?: string;

		/**
		 * 支付参数JSON（如消息内容等附加参数）
		 */
		payParams?: string;

		/**
		 * 退款金额（分）
		 */
		refundAmount?: BigInt;

		/**
		 * 退款时间
		 */
		refundTime?: Date;

		/**
		 * 退款原因
		 */
		refundReason?: string;

		/**
		 * 退款状态：0未申请 1待审批 2已退款 3已拒绝 4退款处理中 5退款失败
		 */
		refundStatus?: number;

		/**
		 * 退款申请时间
		 */
		refundApplyTime?: Date;

		/**
		 * 退款审批时间
		 */
		refundAuditTime?: Date;

		/**
		 * 退款审批人ID
		 */
		refundAuditUserId?: BigInt;

		/**
		 * 退款拒绝或失败原因
		 */
		refundRejectReason?: string;

		/**
		 * 商户退款单号
		 */
		refundNo?: string;

		/**
		 * 是否由总控制台强制退款：0否 1是
		 */
		isForceRefund?: number;

		/**
		 * 客户端IP
		 */
		clientIp?: string;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 昵称
		 */
		userNickName?: string;

		/**
		 * 手机号
		 */
		userPhone?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ProductInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 套餐名称
		 */
		name?: string;

		/**
		 * 副标题/宣传语
		 */
		subtitle?: string;

		/**
		 * 套餐角标内容
		 */
		tagContent?: string;

		/**
		 * 套餐角标背景色
		 */
		tagBackgroundColor?: string;

		/**
		 * 套餐描述
		 */
		description?: string;

		/**
		 * 原价（分）
		 */
		originalPrice?: BigInt;

		/**
		 * 售价（分）
		 */
		sellPrice?: BigInt;

		/**
		 * 包含消息条数
		 */
		messageQuota?: number;

		/**
		 * 0下架 1上架
		 */
		status?: number;

		/**
		 * 排序
		 */
		sortOrder?: number;

		/**
		 * 封面图URL
		 */
		coverImage?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface PluginInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 名称
		 */
		name?: string;

		/**
		 * 简介
		 */
		description?: string;

		/**
		 * Key名
		 */
		keyName?: string;

		/**
		 * Hook
		 */
		hook?: string;

		/**
		 * 描述
		 */
		readme?: string;

		/**
		 * 版本
		 */
		version?: string;

		/**
		 * Logo(base64)
		 */
		logo?: string;

		/**
		 * 作者
		 */
		author?: string;

		/**
		 * 状态 0-禁用 1-启用
		 */
		status?: number;

		/**
		 * 内容
		 */
		content?: any;

		/**
		 * ts内容
		 */
		tsContent?: any;

		/**
		 * 插件的plugin.json
		 */
		pluginJson?: any;

		/**
		 * 配置
		 */
		config?: any;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface RecycleDataEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 表
		 */
		entityInfo?: any;

		/**
		 * 操作人
		 */
		userId?: number;

		/**
		 * 被删除的数据
		 */
		data?: any;

		/**
		 * 请求的接口
		 */
		url?: string;

		/**
		 * 请求参数
		 */
		params?: any;

		/**
		 * 删除数据条数
		 */
		count?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 姓名
		 */
		userName?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SettingDocEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 文档标识：user_agreement | privacy_policy | refund_rules | usage_guide
		 */
		docKey?: string;

		/**
		 * 文档标题
		 */
		title?: string;

		/**
		 * 文档内容（富文本HTML）
		 */
		content?: longtext;

		/**
		 * 状态 0-禁用 1-启用
		 */
		status?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SettingNotifyTemplateEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 业务场景标识：send_result | reply | activity
		 */
		sceneKey?: string;

		/**
		 * 场景名称
		 */
		sceneName?: string;

		/**
		 * 平台：miniprogram | official
		 */
		platform?: string;

		/**
		 * 模板ID
		 */
		templateId?: string;

		/**
		 * 模板标题
		 */
		templateTitle?: string;

		/**
		 * 模板字段映射（JSON）
		 */
		fieldMapping?: string;

		/**
		 * 是否启用 0-禁用 1-启用
		 */
		enabled?: number;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SettingSmsConfigEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 通道名称：aliyun | tencent | other
		 */
		channelName?: string;

		/**
		 * 短信签名
		 */
		signName?: string;

		/**
		 * 短信模板编码
		 */
		templateCode?: string;

		/**
		 * AccessKey（加密存储）
		 */
		accessKey?: string;

		/**
		 * AccessSecret（加密存储）
		 */
		accessSecret?: string;

		/**
		 * API 端点
		 */
		endpoint?: string;

		/**
		 * 是否主通道 0-备用 1-主通道
		 */
		isPrimary?: number;

		/**
		 * 是否启用 0-禁用 1-启用
		 */
		isActive?: number;

		/**
		 * 日发送上限
		 */
		dailyLimit?: number;

		/**
		 * 通道余额（分）
		 */
		balance?: BigInt;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SettingUserEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 用户ID
		 */
		userId?: BigInt;

		/**
		 * 发送结果通知
		 */
		notifySendResult?: number;

		/**
		 * 回复通知
		 */
		notifyReply?: number;

		/**
		 * 活动推送通知
		 */
		notifyActivity?: number;

		/**
		 * 匿名发送默认开启
		 */
		defaultAnonymous?: number;

		/**
		 * 屏蔽所有业务短信
		 */
		blockAllSms?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SpaceInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 地址
		 */
		url?: string;

		/**
		 * 类型
		 */
		type?: string;

		/**
		 * 分类ID
		 */
		classifyId?: number;

		/**
		 * 文件id
		 */
		fileId?: string;

		/**
		 * 文件名
		 */
		name?: string;

		/**
		 * 文件大小
		 */
		size?: number;

		/**
		 * 文档版本
		 */
		version?: number;

		/**
		 * 文件位置
		 */
		key?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SpaceTypeEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 类别名称
		 */
		name?: string;

		/**
		 * 父分类ID
		 */
		parentId?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface TaskInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 任务ID
		 */
		jobId?: string;

		/**
		 * 任务配置
		 */
		repeatConf?: string;

		/**
		 * 名称
		 */
		name?: string;

		/**
		 * cron
		 */
		cron?: string;

		/**
		 * 最大执行次数 不传为无限次
		 */
		limit?: number;

		/**
		 * 每间隔多少毫秒执行一次 如果cron设置了 这项设置就无效
		 */
		every?: number;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 状态 0-停止 1-运行
		 */
		status?: number;

		/**
		 * 开始时间
		 */
		startDate?: Date;

		/**
		 * 结束时间
		 */
		endDate?: Date;

		/**
		 * 数据
		 */
		data?: string;

		/**
		 * 执行的service实例ID
		 */
		service?: string;

		/**
		 * 状态 0-系统 1-用户
		 */
		type?: number;

		/**
		 * 下一次执行时间
		 */
		nextRunTime?: Date;

		/**
		 * 状态 0-cron 1-时间间隔
		 */
		taskType?: number;

		/**
		 * undefined
		 */
		lastExecuteTime?: Date;

		/**
		 * undefined
		 */
		lockExpireTime?: Date;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface TemplateCategoryEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 分类名称
		 */
		name?: string;

		/**
		 * 分类标识(英文key)
		 */
		value?: string;

		/**
		 * 分类描述
		 */
		description?: string;

		/**
		 * 排序权重(越大越靠前)
		 */
		sortOrder?: number;

		/**
		 * 是否启用
		 */
		isActive?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface TemplateInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 模板标题
		 */
		title?: string;

		/**
		 * 模板内容
		 */
		content?: string;

		/**
		 * 分类
		 */
		category?: string;

		/**
		 * 标签(JSON数组)
		 */
		tags?: any;

		/**
		 * 使用建议
		 */
		usageTip?: string;

		/**
		 * 使用人数
		 */
		useCount?: number;

		/**
		 * 收藏人数
		 */
		collectCount?: number;

		/**
		 * 是否匿名模板
		 */
		isAnonymous?: number;

		/**
		 * 排序权重
		 */
		sortOrder?: number;

		/**
		 * 是否推荐
		 */
		isRecommended?: number;

		/**
		 * 是否启用
		 */
		isActive?: number;

		/**
		 * 来源
		 */
		source?: number;

		/**
		 * 创建者
		 */
		creatorId?: BigInt;

		/**
		 * 审核状态
		 */
		auditStatus?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface UserAddressEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 用户ID
		 */
		userId?: number;

		/**
		 * 联系人
		 */
		contact?: string;

		/**
		 * 手机号
		 */
		phone?: string;

		/**
		 * 省
		 */
		province?: string;

		/**
		 * 市
		 */
		city?: string;

		/**
		 * 区
		 */
		district?: string;

		/**
		 * 地址
		 */
		address?: string;

		/**
		 * 是否默认
		 */
		isDefault?: boolean;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface UserInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 登录唯一ID
		 */
		unionid?: string;

		/**
		 * 头像
		 */
		avatarUrl?: string;

		/**
		 * 昵称
		 */
		nickName?: string;

		/**
		 * 手机号
		 */
		phone?: string;

		/**
		 * 性别
		 */
		gender?: number;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 登录方式
		 */
		loginType?: number;

		/**
		 * 密码
		 */
		password?: string;

		/**
		 * 介绍
		 */
		description?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	type json = any;

	interface PagePagination {
		size: number;
		page: number;
		total: number;
		[key: string]: any;
	}

	interface PageResponse<T> {
		pagination: PagePagination;
		list: T[];
		[key: string]: any;
	}

	interface BaseSysLogPageResponse {
		pagination: PagePagination;
		list: BaseSysLogEntity[];
	}

	interface BaseSysMenuPageResponse {
		pagination: PagePagination;
		list: BaseSysMenuEntity[];
	}

	interface BaseSysParamPageResponse {
		pagination: PagePagination;
		list: BaseSysParamEntity[];
	}

	interface BaseSysRolePageResponse {
		pagination: PagePagination;
		list: BaseSysRoleEntity[];
	}

	interface BaseSysUserPageResponse {
		pagination: PagePagination;
		list: BaseSysUserEntity[];
	}

	interface ConversationInfoPageResponse {
		pagination: PagePagination;
		list: ConversationInfoEntity[];
	}

	interface DemoGoodsPageResponse {
		pagination: PagePagination;
		list: DemoGoodsEntity[];
	}

	interface DictInfoPageResponse {
		pagination: PagePagination;
		list: DictInfoEntity[];
	}

	interface DictTypePageResponse {
		pagination: PagePagination;
		list: DictTypeEntity[];
	}

	interface FeedbackInfoPageResponse {
		pagination: PagePagination;
		list: FeedbackInfoEntity[];
	}

	interface MessageBlacklistPageResponse {
		pagination: PagePagination;
		list: MessageBlacklistEntity[];
	}

	interface MessageInfoPageResponse {
		pagination: PagePagination;
		list: MessageInfoEntity[];
	}

	interface OrderBalancePageResponse {
		pagination: PagePagination;
		list: UserBalanceEntity[];
	}

	interface OrderInfoPageResponse {
		pagination: PagePagination;
		list: OrderInfoEntity[];
	}

	interface OrderProductPageResponse {
		pagination: PagePagination;
		list: ProductInfoEntity[];
	}

	interface PluginInfoPageResponse {
		pagination: PagePagination;
		list: PluginInfoEntity[];
	}

	interface RecycleDataPageResponse {
		pagination: PagePagination;
		list: RecycleDataEntity[];
	}

	interface SettingDocPageResponse {
		pagination: PagePagination;
		list: SettingDocEntity[];
	}

	interface SettingNotifyTemplatePageResponse {
		pagination: PagePagination;
		list: SettingNotifyTemplateEntity[];
	}

	interface SettingSmsConfigPageResponse {
		pagination: PagePagination;
		list: SettingSmsConfigEntity[];
	}

	interface SettingUserSettingPageResponse {
		pagination: PagePagination;
		list: SettingUserEntity[];
	}

	interface SpaceInfoPageResponse {
		pagination: PagePagination;
		list: SpaceInfoEntity[];
	}

	interface SpaceTypePageResponse {
		pagination: PagePagination;
		list: SpaceTypeEntity[];
	}

	interface TaskInfoPageResponse {
		pagination: PagePagination;
		list: TaskInfoEntity[];
	}

	interface TemplateCategoryPageResponse {
		pagination: PagePagination;
		list: TemplateCategoryEntity[];
	}

	interface TemplateInfoPageResponse {
		pagination: PagePagination;
		list: TemplateInfoEntity[];
	}

	interface UserAddressPageResponse {
		pagination: PagePagination;
		list: UserAddressEntity[];
	}

	interface UserInfoPageResponse {
		pagination: PagePagination;
		list: UserInfoEntity[];
	}

	interface BaseCoding {
		/**
		 * 获取模块目录结构
		 */
		getModuleTree(data?: any): Promise<any>;

		/**
		 * 创建代码
		 */
		createCode(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: { getModuleTree: string; createCode: string };

		/**
		 * 权限状态
		 */
		_permission: { getModuleTree: boolean; createCode: boolean };

		request: Request;
	}

	interface BaseComm {
		/**
		 * 首页业务排行
		 */
		dashboardRanking(data?: any): Promise<any>;

		/**
		 * 修改个人信息
		 */
		personUpdate(data?: any): Promise<any>;

		/**
		 * 文件上传模式
		 */
		uploadMode(data?: any): Promise<any>;

		/**
		 * 首页统计汇总
		 */
		dashboard(data?: any): Promise<any>;

		/**
		 * 权限与菜单
		 */
		permmenu(data?: any): Promise<any>;

		/**
		 * 编程
		 */
		program(data?: any): Promise<any>;

		/**
		 * 个人信息
		 */
		person(data?: any): Promise<any>;

		/**
		 * 文件上传
		 */
		upload(data?: any): Promise<any>;

		/**
		 * 退出
		 */
		logout(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			dashboardRanking: string;
			personUpdate: string;
			uploadMode: string;
			dashboard: string;
			permmenu: string;
			program: string;
			person: string;
			upload: string;
			logout: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			dashboardRanking: boolean;
			personUpdate: boolean;
			uploadMode: boolean;
			dashboard: boolean;
			permmenu: boolean;
			program: boolean;
			person: boolean;
			upload: boolean;
			logout: boolean;
		};

		request: Request;
	}

	interface BaseOpen {
		/**
		 * 刷新token
		 */
		refreshToken(data?: any): Promise<any>;

		/**
		 * 验证码
		 */
		captcha(data?: any): Promise<any>;

		/**
		 * 登录
		 */
		login(data?: any): Promise<any>;

		/**
		 * 获得网页内容的参数值
		 */
		html(data?: any): Promise<any>;

		/**
		 * 实体信息与路径
		 */
		eps(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			refreshToken: string;
			captcha: string;
			login: string;
			html: string;
			eps: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			refreshToken: boolean;
			captcha: boolean;
			login: boolean;
			html: boolean;
			eps: boolean;
		};

		request: Request;
	}

	interface BaseSysDepartment {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 排序
		 */
		order(data?: any): Promise<any>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysDepartmentEntity[]>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: { delete: string; update: string; order: string; list: string; add: string };

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			order: boolean;
			list: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface BaseSysLog {
		/**
		 * 日志保存时间
		 */
		setKeep(data?: any): Promise<any>;

		/**
		 * 获得日志保存时间
		 */
		getKeep(data?: any): Promise<any>;

		/**
		 * 清理
		 */
		clear(data?: any): Promise<any>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<BaseSysLogPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { setKeep: string; getKeep: string; clear: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { setKeep: boolean; getKeep: boolean; clear: boolean; page: boolean };

		request: Request;
	}

	interface BaseSysMenu {
		/**
		 * 创建代码
		 */
		create(data?: any): Promise<any>;

		/**
		 * 导出
		 */
		export(data?: any): Promise<any>;

		/**
		 * 导入
		 */
		import(data?: any): Promise<any>;

		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 解析
		 */
		parse(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysMenuEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysMenuEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<BaseSysMenuPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			create: string;
			export: string;
			import: string;
			delete: string;
			update: string;
			parse: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			create: boolean;
			export: boolean;
			import: boolean;
			delete: boolean;
			update: boolean;
			parse: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface BaseSysParam {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 获得网页内容的参数值
		 */
		html(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysParamEntity>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<BaseSysParamPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			html: string;
			info: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			html: boolean;
			info: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface BaseSysRole {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysRoleEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysRoleEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<BaseSysRolePageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface BaseSysUser {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 移动部门
		 */
		move(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysUserEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysUserEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<BaseSysUserPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			move: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			move: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface ConversationInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<ConversationInfoEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<ConversationInfoEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<ConversationInfoPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface DemoGoods {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DemoGoodsEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DemoGoodsEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<DemoGoodsPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface DemoTenant {
		/**
		 * 局部不使用多租户
		 */
		noTenant(data?: any): Promise<any>;

		/**
		 * 不使用多租户
		 */
		noUse(data?: any): Promise<any>;

		/**
		 * use
		 */
		use(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: { noTenant: string; noUse: string; use: string };

		/**
		 * 权限状态
		 */
		_permission: { noTenant: boolean; noUse: boolean; use: boolean };

		request: Request;
	}

	interface DictInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 获得所有字典类型
		 */
		types(data?: any): Promise<any>;

		/**
		 * 获得字典数据
		 */
		data(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DictInfoEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DictInfoEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<DictInfoPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			types: string;
			data: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			types: boolean;
			data: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface DictType {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DictTypeEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DictTypeEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<DictTypePageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface FeedbackInfo {
		/**
		 * 更新状态
		 */
		updateStatus(data?: any): Promise<any>;

		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 回复反馈
		 */
		reply(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<FeedbackInfoEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<FeedbackInfoEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<FeedbackInfoPageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			updateStatus: string;
			delete: string;
			reply: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			updateStatus: boolean;
			delete: boolean;
			reply: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface MessageBlacklist {
		/**
		 * 管理员解除拉黑
		 */
		unblock(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<MessageBlacklistEntity>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<MessageBlacklistPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { unblock: string; info: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { unblock: boolean; info: boolean; page: boolean };

		request: Request;
	}

	interface MessageInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 审核消息
		 */
		audit(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<MessageInfoEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<MessageInfoEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<MessageInfoPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			audit: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			audit: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface OrderBalance {
		/**
		 * 调整消息配额
		 */
		adjustQuota(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<UserBalanceEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<UserBalanceEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<OrderBalancePageResponse>;

		/**
		 * 权限标识
		 */
		permission: { adjustQuota: string; info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { adjustQuota: boolean; info: boolean; list: boolean; page: boolean };

		request: Request;
	}

	interface OrderInfo {
		/**
		 * 审批退款申请
		 */
		refundAudit(data?: any): Promise<any>;

		/**
		 * 重试微信退款
		 */
		retryRefund(data?: any): Promise<any>;

		/**
		 * 同步退款状态
		 */
		syncRefund(data?: any): Promise<any>;

		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 关闭订单
		 */
		close(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<OrderInfoEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<OrderInfoEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<OrderInfoPageResponse>;

		/**
		 * 权限标识
		 */
		permission: {
			refundAudit: string;
			retryRefund: string;
			syncRefund: string;
			delete: string;
			close: string;
			info: string;
			list: string;
			page: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			refundAudit: boolean;
			retryRefund: boolean;
			syncRefund: boolean;
			delete: boolean;
			close: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface OrderProduct {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<ProductInfoEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<ProductInfoEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<OrderProductPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface PluginInfo {
		/**
		 * 安装插件
		 */
		install(data?: any): Promise<any>;

		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<PluginInfoEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<PluginInfoEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<PluginInfoPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			install: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			install: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface RecycleData {
		/**
		 * 恢复数据
		 */
		restore(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<RecycleDataEntity>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<RecycleDataPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { restore: string; info: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { restore: boolean; info: boolean; page: boolean };

		request: Request;
	}

	interface SettingDoc {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<SettingDocEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<SettingDocEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<SettingDocPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface SettingNotifyTemplate {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<SettingNotifyTemplateEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<SettingNotifyTemplateEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<SettingNotifyTemplatePageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface SettingSmsConfig {
		/**
		 * primaryChannel
		 */
		primaryChannel(data?: any): Promise<any>;

		/**
		 * toggleActive
		 */
		toggleActive(data?: any): Promise<any>;

		/**
		 * setPrimary
		 */
		setPrimary(data?: any): Promise<any>;

		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<SettingSmsConfigEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<SettingSmsConfigEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<SettingSmsConfigPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			primaryChannel: string;
			toggleActive: string;
			setPrimary: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			primaryChannel: boolean;
			toggleActive: boolean;
			setPrimary: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface SettingUserSetting {
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<SettingUserEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<SettingUserEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<SettingUserSettingPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { info: boolean; list: boolean; page: boolean };

		request: Request;
	}

	interface SpaceInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<SpaceInfoEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<SpaceInfoEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<SpaceInfoPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface SpaceType {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<SpaceTypeEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<SpaceTypeEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<SpaceTypePageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface TaskInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 开始
		 */
		start(data?: any): Promise<any>;

		/**
		 * 执行一次
		 */
		once(data?: any): Promise<any>;

		/**
		 * 停止
		 */
		stop(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<TaskInfoEntity>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<TaskInfoPageResponse>;

		/**
		 * 日志
		 */
		log(data?: any): Promise<any>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			start: string;
			once: string;
			stop: string;
			info: string;
			page: string;
			log: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			start: boolean;
			once: boolean;
			stop: boolean;
			info: boolean;
			page: boolean;
			log: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface TemplateCategory {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<TemplateCategoryEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<TemplateCategoryEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<TemplateCategoryPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface TemplateInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 审核模板
		 */
		audit(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<TemplateInfoEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<TemplateInfoEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<TemplateInfoPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			audit: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			audit: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface UserAddress {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<UserAddressEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<UserAddressEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<UserAddressPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface UserInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<UserInfoEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<UserInfoEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<UserInfoPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface ControlWorkspace {
		/**
		 * 超管修复订单状态
		 */
		repairOrderStatus(data?: any): Promise<any>;

		/**
		 * 超管调整用户权益
		 */
		adjustUserBenefit(data?: any): Promise<any>;

		/**
		 * 搜索真实订单
		 */
		searchOrders(data?: any): Promise<any>;

		/**
		 * 搜索真实用户及权益
		 */
		searchUsers(data?: any): Promise<any>;

		/**
		 * 超管强制退款
		 */
		forceRefund(data?: any): Promise<any>;

		/**
		 * 总控制台审计日志
		 */
		auditList(data?: any): Promise<any>;

		/**
		 * 总控制台统计
		 */
		summary(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			repairOrderStatus: string;
			adjustUserBenefit: string;
			searchOrders: string;
			searchUsers: string;
			forceRefund: string;
			auditList: string;
			summary: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			repairOrderStatus: boolean;
			adjustUserBenefit: boolean;
			searchOrders: boolean;
			searchUsers: boolean;
			forceRefund: boolean;
			auditList: boolean;
			summary: boolean;
		};

		request: Request;
	}

	interface RequestOptions {
		url: string;
		method?: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
		data?: any;
		params?: any;
		headers?: any;
		timeout?: number;
		[key: string]: any;
	}

	type Request = (options: RequestOptions) => Promise<any>;

	type DictKey = "brand" | "occupation" | "templateCategory";

	type Service = {
		request: Request;

		base: {
			coding: BaseCoding;
			comm: BaseComm;
			open: BaseOpen;
			sys: {
				department: BaseSysDepartment;
				log: BaseSysLog;
				menu: BaseSysMenu;
				param: BaseSysParam;
				role: BaseSysRole;
				user: BaseSysUser;
			};
		};
		conversation: { info: ConversationInfo };
		demo: { goods: DemoGoods; tenant: DemoTenant };
		dict: { info: DictInfo; type: DictType };
		feedback: { info: FeedbackInfo };
		message: { blacklist: MessageBlacklist; info: MessageInfo };
		order: { balance: OrderBalance; info: OrderInfo; product: OrderProduct };
		plugin: { info: PluginInfo };
		recycle: { data: RecycleData };
		setting: {
			doc: SettingDoc;
			notifyTemplate: SettingNotifyTemplate;
			smsConfig: SettingSmsConfig;
			userSetting: SettingUserSetting;
		};
		space: { info: SpaceInfo; type: SpaceType };
		task: { info: TaskInfo };
		template: { category: TemplateCategory; info: TemplateInfo };
		user: { address: UserAddress; info: UserInfo };
		control: { workspace: ControlWorkspace };
	};
}

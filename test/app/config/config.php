<?php
namespace Hagane;

class Config {
	private $appDir;
	private $appDepth;

	public function __construct($HaganeInit = array()){
		$this->appDir = $HaganeInit['appFolderName'];
		$this->appDepth = $HaganeInit['appFolderDepth'];
	}

	function getConf() {
		return
			array(
				'appPath' => $this->appDepth.$this->appDir.'/',
				'template' => 'main',
				'db_engine' => 'mysql',
				'db_server' => 'localhost',
				'db_database' => 'haganeso_crm',
				'db_user' => 'haganeso_dev',
				'db_password' => 'Bicarbonato1!',
				// 'db_database' => 'hagane_pef',
				// 'db_user' => 'root',
				// 'db_password' => '',
				'session_time' => 3600,
				'document_root' => '/'
			);
	}

	function getModules() {
		return
			array();
	}

	function getRoutes() {
		// Add custom routes here so you can call them with a simple route name
		// Use the key of the element in the array as
		return
			array(
				'logout' => 'User/logout',
				'login' => 'User/index'
			);
	}
}
?>
